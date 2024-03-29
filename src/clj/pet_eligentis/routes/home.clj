(ns pet-eligentis.routes.home
  (:require
   [pet-eligentis.layout :as layout]
   [clojure.java.io :as io]
   [pet-eligentis.db.core :as db]
   [pet-eligentis.middleware :as middleware]
   [ring.util.http-response :as response]
   [selmer.parser :refer [render-file]]
   [monger.operators :refer :all]))

(defn home-page [request]
  (layout/render request "home.html" {:fact-dog (db/get (into {} [[:Id (rand-int 386)]]) "dogfacts")
                                      :fact-cat (db/get (into {} [[:Id (rand-int 36)]]) "catfacts")}))

(defn about-page [request]
  (layout/render request "about.html"))

(defn pet-page [request]
  (layout/render request "pet.html"))

(defn signin-page [request]
  (if (or (contains? (get-in request [:session]) :user))
    (home-page request)
    (layout/render request "signin.html")))

(defn signup-page [request]
  (layout/render request "signup.html"))

(defn set-user! [id {session :session} request]
  (-> (home-page request)
      (assoc :session (assoc session :user id))
      (assoc :cookies {"username" {:value id, :max-age 7200}})))

(defn remove-user! [request]
  (-> (home-page request)
      (assoc :session (dissoc (get request :session) :user))
      (assoc :cookies {"username" {:max-age 0}})))

;(defn clear-session! []
 ; (-> (resp/response "Session cleared")
  ;    (dissoc :session)
   ;   (assoc :headers {"Content-Type" "text/plain"})))

(defn signin [request]
  (let [{{username :username password :password} :params} request]
    (if (db/get (into {} [[:username username] [:password password]]) "users")
      (set-user! username {:keys [:params]} request)
      (layout/error-page {:status 404, :title "404 - User not found"}))))

(defn signup [request]
  (let [{{username :username password :pass email :email} :params} request]
    (if (or (db/get (into {} [[:username username]]) "users")
            (db/get (into {} [[:email email]]) "users")) (layout/render request "signup.html")
        (do (db/create (into {} [[:username username]
                                 [:email email]
                                 [:password password]]) "users")
            (layout/render request "signin.html")))))

(defn show-pet [request]
  (let [pet (db/find-all (into {} [[:owner (get-in request [:session :user])]]) "pets")]
    (layout/render request "your-pet-template.html" {:items pet})))

(defn new-pet [request]
  (let [{{pet :pet breed :breed age :age name :name} :params} request]
    (println (get-in request [:cookies "username" :value]))
    (db/create (into {} [[:owner (get-in request [:cookies "username" :value])]
                         [:pet pet]
                         [:breed breed]
                         [:age age]
                         [:name name]]) "pets")
    (show-pet request)))

(defn logout [request]
  (remove-user! request))

(defn delete-pet [request]
  (let [{{name :name} :params} request]
    (db/delete (into {} [[:owner (get-in request [:cookies "username" :value])]
                         [:name name]]) "pets")
    (show-pet request)))

(defn find-dog [request]
  (let [{{wanderlust :wanderlust-potential kid-friendly-mouthiness :kid_friendly-mthnss
          exercise-weight-intensity :exercise_need-weight_gain-intnsty sensitivity :sensitivity
          dog-frndly-frndly-twrds-strngrs :dog_frnd-frnd_twrds_strngrs being-alone :being-alone drooling :drooling
          easy-train-trainability :easy_train-trnblty shedding-easy-grooming :amnt_shedd-easy_groom energy-level :energy_level
          intelligence :intelligence size :size novice_owners :novice_owners prey_drive :prey_drive hot-cold :hot-cold} :params} request]
    (db/find-all (into {} [[:Easy-To-Train (cond (= 5 (read-string easy-train-trainability)) {$gte 1 $lte 5}
                                                 (= 4 (read-string easy-train-trainability)) {$gte 2 $lte 5}
                                                 (= 3 (read-string easy-train-trainability)) {$gte 3 $lte 5}
                                                 (= 2 (read-string easy-train-trainability)) {$gte 4 $lte 5}
                                                 :else {$gte 4 $lte 5})]
                           [:Amount-Of-Shedding (cond (= 1 (read-string shedding-easy-grooming)) {$gte 1 $lte 5}
                                                      (= 2 (read-string shedding-easy-grooming)) {$gte 1 $lte 4}
                                                      (= 3 (read-string shedding-easy-grooming)) {$gte 1 $lte 3}
                                                      (= 4 (read-string shedding-easy-grooming)) {$gte 1 $lte 2}
                                                      :else {$gte 1 $lte 2})]
                           [:Tolerates-Being-Alone (cond (= 5 (read-string being-alone)) {$gte 1 $lte 5}
                                                         (= 4 (read-string being-alone)) {$gte 2 $lte 5}
                                                         (= 3 (read-string being-alone)) {$gte 3 $lte 5}
                                                         (= 2 (read-string being-alone)) {$gte 4 $lte 5}
                                                         :else {$gte 4 $lte 5})]
                           [:Drooling-Potential (cond (= 1 (read-string drooling)) {$gte 1 $lte 5}
                                                      (= 2 (read-string drooling)) {$gte 1 $lte 4}
                                                      (= 3 (read-string drooling)) {$gte 1 $lte 3}
                                                      (= 4 (read-string drooling)) {$gte 1 $lte 2}
                                                      :else {$gte 1 $lte 2})]
                           [:Size (cond (= 5 (read-string size)) {$gte 4 $lte 5}
                                        (= 4 (read-string size)) {$gte 3 $lte 4}
                                        (= 3 (read-string size)) {$gte 2 $lte 4}
                                        (= 2 (read-string size)) {$gte 1 $lte 3}
                                        :else {$gte 1 $lte 2})]
                           [:Tolerates-Cold-Weather (cond (= 5 (read-string hot-cold)) {$gte 1 $lte 5}
                                                          (= 4 (read-string hot-cold)) {$gte 2 $lte 5}
                                                          (= 3 (read-string hot-cold)) {$gte 3 $lte 5}
                                                          (= 2 (read-string hot-cold)) {$gte 4 $lte 5}
                                                          :else {$gte 4 $lte 5})]
                           [:Tolerates-Hot-Weather (cond (= 1 (read-string hot-cold)) {$gte 1 $lte 5}
                                                         (= 2 (read-string hot-cold)) {$gte 2 $lte 5}
                                                         (= 3 (read-string hot-cold)) {$gte 3 $lte 5}
                                                         (= 4 (read-string hot-cold)) {$gte 4 $lte 5}
                                                         :else {$gte 4 $lte 5})]
                           [:Energy-Level (cond (= 1 (read-string energy-level)) {$gte 1 $lte 4}
                                                (= 2 (read-string energy-level)) {$gte 2 $lte 4}
                                                (= 3 (read-string energy-level)) {$gte 3 $lte 5}
                                                (= 4 (read-string energy-level)) {$gte 4 $lte 5}
                                                :else {$gte 4 $lte 5})]
                           [:Intelligence (cond (= 5 (read-string intelligence)) {$gte 4 $lte 5}
                                                (= 4 (read-string intelligence)) {$gte 3 $lte 4}
                                                (= 3 (read-string intelligence)) {$gte 2 $lte 4}
                                                :else {$gte 1 $lte 3})]
                           [:Prey-Drive (cond (= 1 (read-string prey_drive)) {$gte 1 $lte 5}
                                              (= 2 (read-string prey_drive)) {$gte 1 $lte 4}
                                              (= 3 (read-string prey_drive)) {$gte 1 $lte 3}
                                              (= 4 (read-string prey_drive)) {$gte 1 $lte 2}
                                              :else {$gte 1 $lte 2})]
                           [:Exercise-Needs (cond (= 5 (read-string exercise-weight-intensity)) {$gte 2 $lte 5}
                                                  (= 4 (read-string exercise-weight-intensity)) {$gte 1 $lte 4}
                                                  (= 3 (read-string exercise-weight-intensity)) {$gte 1 $lte 3}
                                                  (= 2 (read-string exercise-weight-intensity)) {$gte 1 $lte 2}
                                                  :else {$gte 1 $lte 2})]
                           [:Sensitivity-Level (cond (= 1 (read-string sensitivity)) {$gte 1 $lte 5}
                                                     (= 2 (read-string sensitivity)) {$gte 1 $lte 4}
                                                     (= 3 (read-string sensitivity)) {$gte 1 $lte 3}
                                                     (= 4 (read-string sensitivity)) {$gte 1 $lte 2}
                                                     :else {$gte 1 $lte 2})]
                           [:Incredibly-Kid-Friendly-Dogs (cond (= 1 (read-string kid-friendly-mouthiness)) {$gte 1 $lte 5}
                                                                (= 2 (read-string kid-friendly-mouthiness)) {$gte 2 $lte 5}
                                                                (= 3 (read-string kid-friendly-mouthiness)) {$gte 3 $lte 5}
                                                                (= 4 (read-string kid-friendly-mouthiness)) {$gte 4 $lte 5}
                                                                :else {$gte 4 $lte 5})]
                           [:Wanderlust-Potential (cond (= 1 (read-string wanderlust)) {$gte 1 $lte 5}
                                                        (= 2 (read-string wanderlust)) {$gte 1 $lte 4}
                                                        (= 3 (read-string wanderlust)) {$gte 1 $lte 3}
                                                        (= 4 (read-string wanderlust)) {$gte 1 $lte 2}
                                                        :else {$gte 1 $lte 2})]]) "dogs")))

(defn find-cat [request]
  (let [{{shedding :shedding tendency-vocalize :tendency_vocalize affec-family :affec_family
          intelligence :intelligence poten-playful :poten_playful pet-frndly :pet_frndly
          kid-frndly :kid_frndly frndly-twrds-strngrs :frndly_twrds_strngrs} :params} request]
    (db/find-all (into {} [[:Affectionate-with-Family (cond (= 5 (read-string affec-family)) {$gte 4 $lte 5}
                                                            (= 4 (read-string affec-family)) {$gte 4 $lte 5}
                                                            (= 3 (read-string affec-family)) {$gte 3 $lte 4}
                                                            :else {$gte 1 $lte 3})]
                           [:Amount-of-Shedding (cond (= 1 (read-string shedding)) {$gte 1 $lte 5}
                                                      (= 2 (read-string shedding)) {$gte 1 $lte 4}
                                                      (= 3 (read-string shedding)) {$gte 1 $lte 3}
                                                      (= 4 (read-string shedding)) {$gte 1 $lte 2}
                                                      :else {$gte 1 $lte 2})]
                           [$or [{ :Friendly-Toward-Strangers (cond (= 1 (read-string frndly-twrds-strngrs)) {$gte 1 $lte 5}
                                                             (= 2 (read-string frndly-twrds-strngrs)) {$gte 2 $lte 5}
                                                             (= 3 (read-string frndly-twrds-strngrs)) {$gte 3 $lte 5}
                                                             (= 4 (read-string frndly-twrds-strngrs)) {$gte 4 $lte 5}
                                                             :else 5)} {:Friendly-Toward-Strangers {$exists false}}]]
                           [:Intelligence (cond (= 5 (read-string intelligence)) {$gte 1 $lte 5}
                                                (= 4 (read-string intelligence)) {$gte 1 $lte 4}
                                                :else {$gte 1 $lte 4})]
                           [:Kid-Friendly (cond (= 1 (read-string kid-frndly)) {$gte 1 $lte 5}
                                                (= 2 (read-string kid-frndly)) {$gte 2 $lte 5}
                                                (= 3 (read-string kid-frndly)) {$gte 3 $lte 5}
                                                (= 4 (read-string kid-frndly)) {$gte 4 $lte 5}
                                                :else 5)]
                           [:Pet-Friendly (cond (= 1 (read-string pet-frndly)) {$gte 1 $lte 5}
                                                (= 2 (read-string pet-frndly)) {$gte 2 $lte 5}
                                                (= 3 (read-string pet-frndly)) {$gte 3 $lte 5}
                                                (= 4 (read-string pet-frndly)) {$gte 4 $lte 5}
                                                :else {$gte 4 $lte 5})]
                           [:Potential-for-Playfulness (cond (= 5 (read-string poten-playful)) {$gte 4 $lte 5}
                                                             (= 4 (read-string poten-playful)) {$gte 3 $lte 5}
                                                             (= 3 (read-string poten-playful)) {$gte 2 $lte 4}
                                                             :else {$gte 1 $lte 3})]
                           [$or [{ :Tendency-to-Vocalize (cond (= 5 (read-string tendency-vocalize)) {$gte 1 $lte 5}
                                                        (= 4 (read-string tendency-vocalize)) {$gte 1 $lte 4}
                                                        (= 3 (read-string tendency-vocalize)) {$gte 1 $lte 3}
                                                        (= 2 (read-string tendency-vocalize)) {$gte 1 $lte 2}
                                                        :else 1)} {:Tendency-to-Vocalize {$exists false}}]]
                           ])"cats")))

(defn prefered-dog [request]
  (let [dogs (find-dog request)]
    (layout/render request "prefered-dog-template.html" {:items dogs})))

(defn prefered-cat [request]
  (let [cats (find-cat request)]
    (layout/render request "prefered-cat-template.html" {:items cats})))

(defn pet-pref-dog-page [request]
  (layout/render request "pet-preferences-dog.html"))

(defn pet-pref-cat-page [request]
  (layout/render request "pet-preferences-cat.html"))

(defn your-pet-page [request]
  (if (or (contains? (get-in request [:session]) :user))
    (show-pet request)
    (layout/render request "signin.html")))

(defn home-routes []
  [""
   {:middleware [middleware/wrap-csrf
                 middleware/wrap-formats]}
   ["/" {:get home-page
         :post signin}]
   ["/about" {:get about-page}]
   ["/signin" {:get signin-page
               :post signup}]
   ["/signup" {:get signup-page}]
   ["/logout" {:get logout}]
   ["/pet" {:get pet-page}]
   ["/pet/yourpet" {:post new-pet
                    :get your-pet-page}]
   ["/pet/deletepet" {:post delete-pet}]
   ["/pet-preferences-dog" {:get pet-pref-dog-page}]
   ["/pet-preferences-cat" {:get pet-pref-cat-page}]
   ["/prefered-cat" {:post prefered-cat}]
   ["/prefered-dog" {:post prefered-dog}]])



