FROM openjdk:8-jdk-alpine

VOLUME /tmp

ARG JAR_FILE

COPY target/${JAR_FILE} billing-service.jar

#Using Dokerize to chec whether db is up, if it is then start this service.
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://bookstore-mysql-db:3306 -timeout 15m java -Djava.security.egd=file:/dev/./urandom -jar /billing-service.jar