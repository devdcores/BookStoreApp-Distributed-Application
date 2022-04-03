FROM openjdk:8-jdk-alpine

VOLUME /tmp

ARG JAR_FILE

COPY target/${JAR_FILE} gateway-server.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-javaagent:/java-agent/ver22.3.0.33637/javaagent.jar","-jar","/gateway-server.jar"]