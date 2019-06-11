FROM openjdk:8-alpine

COPY target/uberjar/pet-eligentis.jar /pet-eligentis/app.jar

EXPOSE 3000

CMD ["java", "-jar", "/pet-eligentis/app.jar"]
