FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY target/${JAR_FILE} gateway-server.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/gateway-server.jar"]

#
#FROM java:8-jdk-alpine
#COPY ./target/ZuulApiGateway-0.0.1-SNAPSHOT.jar /usr/app/
#WORKDIR /usr/app
#
#RUN sh -c 'touch ZuulApiGateway-0.0.1-SNAPSHOT.jar'
#ENTRYPOINT ["java","-jar","ZuulApiGateway-0.0.1-SNAPSHOT.jar"]