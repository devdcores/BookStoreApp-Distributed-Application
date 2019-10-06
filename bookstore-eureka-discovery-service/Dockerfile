FROM openjdk:8-jdk-alpine

VOLUME /tmp

ARG JAR_FILE

COPY target/${JAR_FILE} eureka-app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/eureka-app.jar"]