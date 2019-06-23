(ns pet-eligentis.routes.home
  (:require
   [pet-eligentis.layout :as layout]
   [clojure.java.io :as io]
   [pet-eligentis.db.core :as db]
   [pet-eligentis.middleware :as middleware]
   [ring.util.http-response :as response]
   [selmer.parser :refer [render-file]]))

(defn home-page [request]
  (layout/render request "home.html"))

(defn about-page [request]
  (layout/render request "about.html"))

(defn pet-page [request]
  (layout/render request "pet.html"))

(defn signin-page [request]
  (if (or (contains? (get-in request [:session]) :user))
    (home-page request)
    (layout/render request "signin.html")))

(defn signin-cookie [request]
  (layout/render request "signin.html"))

(defn signup-page [request]
  (layout/render request "signup.html"))

(defn set-user! [id {session :session} request]
  (-> (home-page request)
      (assoc :session (assoc session :user id))
      (assoc :cookies {"username" {:value id, :max-age 7200}})))

(defn remove-user! [request]
  (-> (signin-cookie request)
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
      ;(layout/render request "home.html" {:docs (-> "docs/docs.md" io/resource slurp)})
      (layout/error-page {:status 404, :title "404 - User not found"}))))

(defn signup [request]
  (let [{{username :username password :pass email :email} :params} request]
    (if (or (db/get (into {} [[:username username]]) "users")
            (db/get (into {} [[:email email]]) "users")) (layout/render request "signup.html")
        (do (db/create (into {} [[:username username]
                                 [:email email]
                                 [:password password]]) "users")
            (layout/render request "signin.html")))))

;(defn your-pet [request]
;  (selmer.parser/set-resource-path! "C:/Users/Srdjan/pet-eligentis/resources/html")
;  (spit "C:/Users/Srdjan/pet-eligentis/resources/html/your-pet-template.html"
;        (render-file "your-pet.html" {:pet pet
;                                      :breed breed
;                                      :age age
;                                      :name name}))
;  (layout/render request "your-pet.html"))

(defn new-pet-page [request]
  (let [{{pet :pet breed :breed age :age name :name} :params} request]
    (println (get-in request [:cookies "username" :value]))
    (db/create (into {} [[:owner (get-in request [:cookies "username" :value])]
                         [:pet pet]
                         [:breed breed]
                         [:age age]
                         [:name name]]) "pets")
    (selmer.parser/set-resource-path! "C:/Users/Srdjan/pet-eligentis/resources/html")
    (spit "C:/Users/Srdjan/pet-eligentis/resources/html/your-pet.html"
          (render-file "your-pet-template.html" {:pet pet
                                                 :breed breed
                                                 :age age
                                                 :name name}))
    (layout/render request "your-pet.html")))

(defn logout [request]
  (remove-user! request))

(comment (defn find-dog [request]
           (let [{{wanderlust :wanderlust-potential kid-friendly-mouthiness :kid_friendly-mthnss
                   exercise-weight-intensity :exercise_need-weight_gain-intnsty sensitivity :sensitivity
                   dog-frndly-frndly-twrds-strngrs :dog_frnd-frnd_twrds_strngrs being-alone :being-alone drooling :drooling
                   easy-train-trainability :easy_train-trnblty shedding-easy-grooming :amnt_shedd-easy_groom energy-level :energy_level
                   intelligence :intelligence size :size novice_owners :novice_owners prey_drive :prey_drive hot-cold :hot-cold} :params} request]
             (db/find-all (into {} [[:Trainability (read-string easy-train-trainability)]
                                    [:Amount-Of-Shedding (read-string shedding-easy-grooming)]
                                    [:Tolerates-Being-Alone (read-string being-alone)]
                                    [:Easy-To-Train (read-string easy-train-trainability)]
                                    [:Drooling-Potential (read-string drooling)]
                                    [:Size (read-string size)]
                                    [:Tolerates-Cold-Weather (if (= hot-cold 1) 5)]
                                    [:Tolerates-Hot-Weather (if (= hot-cold 5) 5)]
                                    [:Energy-Level (read-string energy_level)]
                                    [:Intelligence (read-string intelligence)]
                                    [:Prey-Drive (read-string prey_drive)]
                                    [:Exercise-Needs (read-string exercise-weight-intensity)]
                                    [:Sensitivity-Level (read-string sensitivity)]
                                    [:Incredibly-Kid-Friendly-Dogs (read-string kid-friendly-mouthiness)]
                                    [:Wanderlust-Potential (read-string wanderlust)]]) "dogs"))))

(defn find-cat [request]
  (let [{{shedding :shedding tendency-vocalize :tendency_vocalize affec-family :affec_family
          intelligence :intelligence poten-playful :poten_playful pet-frndly :pet_frndly
          kid-frndly :kid_frndly frndly-twrds-strngrs :frndly_twrds_strngrs} :params} request]
    (println (get request :params))
    (println (db/find-all (into {} [[:Affectionate-with-Family (read-string affec-family)]
                                    [:Amount-of-Shedding (read-string shedding)]
                                    [:Friendly-Toward-Strangers (read-string frndly-twrds-strngrs)]
                                    [:Intelligence (read-string intelligence)]
                                    [:Kid-Friendly (read-string kid-frndly)]
                                    [:Pet-Friendly (read-string pet-frndly)]
                                    [:Potential-for-Playfulness (read-string poten-playful)]
                                    [:Tendency-to-Vocalize (read-string tendency-vocalize)]]) "cats"))))

(defn pet-pref-dog-page [request]
  (layout/render request "pet-preferences-dog.html"))

(defn pet-pref-cat-page [request]
  (layout/render request "pet-preferences-cat.html"))


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
   ["/pet/yourpet" {:post new-pet-page}]
   ["/pet-preferences-dog" {:get pet-pref-dog-page}]
   ["/pet-preferences-cat" {:get pet-pref-cat-page}]
   ["/prefered-cat" {:post find-cat}]])
   ;["/prefered-dog" {:post find-dog}]
   

