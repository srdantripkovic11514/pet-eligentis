(ns pet-eligentis.env
  (:require
    [selmer.parser :as parser]
    [clojure.tools.logging :as log]
    [pet-eligentis.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[pet-eligentis started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[pet-eligentis has shut down successfully]=-"))
   :middleware wrap-dev})
