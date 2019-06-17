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
      (assoc :cookies {"username" {:value id, :max-age 7200}})
      )
  )

(defn remove-user! [request]
  (-> (signin-cookie request)
      (assoc :session (dissoc (get request :session) :user))
      (assoc :cookies {"username" {:max-age 0}})
      )
  )

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

;(defn find-pet [request]
 ; (let [])
  ;)

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
   ["/pet/yourpet" {:post new-pet-page}]])

