(ns pet-eligentis.env
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[pet-eligentis started successfully]=-"))
   :stop
   (fn []
     (log/info "\n-=[pet-eligentis has shut down successfully]=-"))
   :middleware identity})
