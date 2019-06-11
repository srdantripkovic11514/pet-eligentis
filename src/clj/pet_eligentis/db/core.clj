(ns pet-eligentis.db.core
    (:require
      [monger.core :as mg]
      [monger.collection :as mc]
      [monger.operators :refer :all]
      [mount.core :refer [defstate]]
      [pet-eligentis.config :refer [env]]))

(defstate db*
  :start (-> env :database-url mg/connect-via-uri)
  :stop (-> db* :conn mg/disconnect))

(defstate db
  :start (:db db*))

(defn create [obj coll]
  (mc/insert db coll obj))

(defn get [obj coll]
  (mc/find-one-as-map db coll obj))

(defn save-return [obj coll]
  (mc/save-and-return db coll obj))

(defn find-one-as-map [obj coll]
  (mc/find-one-as-map db coll obj))

(defn delete [obj coll]
  (mc/remove db coll obj))