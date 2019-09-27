# BookStoreApp-Distributed-Application [![HitCount](http://hits.dwyl.io/devdcores/BookStoreApp-Distributed-Application.svg)](http://hits.dwyl.io/devdcores/BookStoreApp-Distributed-Application)

## About this project
This is an Ecommerce project, where users can adds books to the cart and buy those books.


Application is being developed using Java, Spring and React.

Using Spring Cloud Microservices and Spring Boot Framework extensively to make this application distributed. 

## Architecture of this project
All the Microservices are developed using spring boot. 
This spring boot applications will be registered with eureka discovery server.

FrontEnd React App makes request's to NGINX server which acts as a reverse proxy.
NGINX server redirects the requests to Zuul API Gateway. 

Zuul will route the requests to microservice
based on the url route. Zuul also registers with eureka and gets the ip/domain from eureka for microservice while routing the request. 

## Deployment of this project
AWS is the cloud provider will be using to deploy this project.

Project wil deployed in multiple Regions and multiple Availability Zones. 

React App, Zuul and Eureka will be the public facing service, which will be in public subnet

All the microservices will be packed into docker containers and deployes in the AWS ECS in the private subnet.

Private subnets uses NAT Gateway to make requests to external internet.

Bastian host can be used to ssh into private subnet microservices.

Below is the AWS Architecture diagram for better understanding.

![Bookstore Final](https://user-images.githubusercontent.com/14878408/65784998-000e4500-e171-11e9-96d7-b7c199e74c4c.jpg)



## Run this project in local machine
>Using Docker

Start Docker Engine in your machine.
Run `mvn clean install` to build all the microservices jars.
Run `sh oneTouchDockerImageBuilder.sh` script to package microservice jars into docker images.
Run `docker-compose up` to start all the containers.

Use the Postman Api collection in the Postman directory. To make request to various services.

Services will be exposed in this ports

```
Api Gateway Service : 8765
Eureka Discovery Service : 8761
Account Service : 4001
Billing Service : 5001
Catalog Service : 6001
Order Service : 7001
```

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