# BookStoreApp-Distributed-Application [![HitCount](http://hits.dwyl.io/devdcores/BookStoreApp-Distributed-Application.svg)](http://hits.dwyl.io/devdcores/BookStoreApp-Distributed-Application)

## About this project
This is an Ecommerce project, where users can adds books to the cart and buy those books.

Application is being developed using Java, Spring and React.

Using Spring Cloud Microservices and Spring Boot Framework extensively to make this application distributed. 

## Architecture
All the Microservices are developed using spring boot. 
This spring boot applications will be registered with eureka discovery server.

FrontEnd React App makes request's to NGINX server which acts as a reverse proxy.
NGINX server redirects the requests to Zuul API Gateway. 

Zuul will route the requests to microservice
based on the url route. Zuul also registers with eureka and gets the ip/domain from eureka for microservice while routing the request. 

## Run this project in Local Machine

>Using Intellij/Eclipse or Command Line

Import this project into IDE and run all Spring boot projects or 
build all the jars running `mvn clean install` command in root parent pom, which builds all jars.
All services will be up in the below mentioned ports.

But running this way we wont get monitoring of microservices. 
So if monitoring needed to see metrics like jvm memory, tomcat error count and other metrics.

Use below method to deploy all the services and monitoring setup in docker.

>Using Docker(Recommended)

Start Docker Engine in your machine.

Run `mvn clean install` at root of project to build all the microservices jars.

Run `docker-compose up --build` to start all the containers.

Use the `Postman Api collection` in the Postman directory. To make request to various services.

Services will be exposed in this ports

```
Api Gateway Service       : 8765
Eureka Discovery Service  : 8761
Account Service           : 4001
Billing Service           : 5001
Catalog Service           : 6001
Order Service             : 7001
```


## Deployment(In Future It will be deployed like this)
AWS is the cloud provider will be using to deploy this project.

Project wil deployed in multiple Regions and multiple Availability Zones. 

React App, Zuul and Eureka will be the public facing service, which will be in public subnet

All the microservices will be packed into docker containers and deployes in the AWS ECS in the private subnet.

Private subnets uses NAT Gateway to make requests to external internet.

Bastian host can be used to ssh into private subnet microservices.

Below is the AWS Architecture diagram for better understanding.

![Bookstore Final](https://user-images.githubusercontent.com/14878408/65784998-000e4500-e171-11e9-96d7-b7c199e74c4c.jpg)


## Monitoring
Using Docker images of Prometheus, Graphana and Zipkin for monitoring microservices, 
using docker images makes setting up graphana, zipkin, prometheus very easy. Just run docker images of those and
send or pull metrics from monitoring containers.

`docker-compose` will take care of bringing all this monitoring containers up.

>To Setup Prometheus

Copy prometheus.yml to your path(where docker can mount as volume).

Change the volume path for prometheus container in docker-compose.yml file.
More details at this link : https://www.callicoder.com/spring-boot-actuator-metrics-monitoring-dashboard-prometheus-grafana/

Dashboards are available at below ports

```
Graphana   : 3030
Zipkin     : 9411
Prometheus : 9090
```

**Screenshots of Monitoring in Graphana.**

<img alt="API Gateway Metrics" src="https://user-images.githubusercontent.com/14878408/65935653-7c39ae80-e437-11e9-884e-8e2e0dce5b8c.png">
<hr>
<img alt="API Gateway Metrics2" src="https://user-images.githubusercontent.com/14878408/65935715-bb67ff80-e437-11e9-8e22-ce94d64cfb87.png">


**Screenshots of Tracing in Zipkin.**

<img alt="Zipkin" src="https://user-images.githubusercontent.com/14878408/65939069-6b426a80-e442-11e9-90fd-d54b60786d41.png">
<hr>
<img alt="Zipkin" src="https://user-images.githubusercontent.com/14878408/65939165-bb213180-e442-11e9-9ad7-5cfd4fa121ef.png">



> Account Service

There are 2 users in the system currently. 
ADMIN, USER

To Get `access_token` for the user, you need `clientId` and `clientSecret`

clientId : `defaultfirstclientid` <br />
clientSecret : `jwtpass` <br />
<br />
Admin userName: `admin.admin`  <br />
password: `jwtpass`<br />
<br />
Normal User userName: `john.doe`<br />
password: `jwtpass`
<br />

*To get the accessToken (Admin User)* 

```curl defaultfirstclientid:jwtpass@localhost:4001/oauth/token -d grant_type=password -d username=admin.admin -d password=jwtpass```

<br />
<hr>

## Roadmap

1. Start Bookstore-react frontend project.
2. Start Bookstore-payment-service.
3. Start DevOps CICD using Terraform/Ansible/Cloudformation.(Least Priority)