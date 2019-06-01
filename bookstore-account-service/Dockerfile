FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY target/${JAR_FILE} account-service.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/account-service.jar"]