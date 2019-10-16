# BookStoreApp-Distributed-Application [![HitCount](http://hits.dwyl.io/devdcores/BookStoreApp-Distributed-Application.svg)](http://hits.dwyl.io/devdcores/BookStoreApp-Distributed-Application)

<hr>

## About this project
This is an Ecommerce project, where users can adds books to the cart and buy those books.

Application is being developed using Java, Spring and React.

Using Spring Cloud Microservices and Spring Boot Framework extensively to make this application distributed. 

<hr>

## Architecture
All the Microservices are developed using spring boot. 
This spring boot applications will be registered with eureka discovery server.

FrontEnd React App makes request's to NGINX server which acts as a reverse proxy.
NGINX server redirects the requests to Zuul API Gateway. 

Zuul will route the requests to microservice
based on the url route. Zuul also registers with eureka and gets the ip/domain from eureka for microservice while routing the request. 

<hr>

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
Consul Discovery          : 8500
Account Service           : 4001
Billing Service           : 5001
Catalog Service           : 6001
Order Service             : 7001
```

<hr>

### Service Discovery
This project uses Eureka or Consul as Discovery service.

While running services in local, then using eureka as service discovery.

While running using docker, then consul is the service discovery. 

Reason to use Consul is it has better features and support compared to Eureka. Running services individually in local uses Eureka as service discovery because dont want to run consul agent and set it up as it becomes extra overhead to manage. Since docker-compose manages all consul stuff hence using Consul while running services in docker.

<hr>

### Troubleshooting

If any issue while starting up services or any api failing.
It may be because of new columns or new tables, at this point of time i am not worried much about DB migrations.

So any issues, **clear/drop bookstore_db**, things may start working agai, if not **raise a Issue in Github** i will help.

<hr>

## Deployment(In Future It will be deployed like this)
AWS is the cloud provider will be using to deploy this project.

Project wil deployed in multiple Regions and multiple Availability Zones. 

React App, Zuul and Eureka will be the public facing service, which will be in public subnet

All the microservices will be packed into docker containers and deployes in the AWS ECS in the private subnet.

Private subnets uses NAT Gateway to make requests to external internet.

Bastian host can be used to ssh into private subnet microservices.

Below is the AWS Architecture diagram for better understanding.

![Bookstore Final](https://user-images.githubusercontent.com/14878408/65784998-000e4500-e171-11e9-96d7-b7c199e74c4c.jpg)

<hr>

## Monitoring
There are 2 setups for monitoring

1. Prometheus and Graphana.
2. TICK stack monitoring.

Both the setups are very powerful, where prometheus works on pull model. we have to provide target hosts where the prometheus can pull the metrics from. If we specify target hosts using individual hostname/ip its not feasible at end because it will be like hard coded hostnames/ip. So we use Consul discovery to provide target hosts dynamically. By this way when more instances added for same service no need to worry about adding to prometheus target hosts because consul will dynamically add this target in prometheus.

TICK(Telegraf, InfluxDB, Chronograf, Kapacitor) This setup is getting more attention due to its push and pull model. InfluxDB is a time series database, bookstore services push the metrics to influxDB(push model), In Telegraf we specify the targets to pull metrics(pull model). Chronograf/Graphana can be used to view the graph/charts. Kapacitor is used to configure rules for alarms.

`docker-compose` will take care of bringing all this monitoring containers up.

Dashboards are available at below ports

```
Graphana   : 3030
Zipkin     : 9411
Prometheus : 9090
Telegraf   : 8125
InfluxDb   : 8086
Chronograf : 8888
Kapacitor  : 9092 

```

```
First time login to Graphana use below credentials

Username : admin  
Password : admin

```

<hr>

**Screenshots of Tracing in Zipkin.**

<img alt="Zipkin" src="https://user-images.githubusercontent.com/14878408/65939069-6b426a80-e442-11e9-90fd-d54b60786d41.png">
<hr>
<img alt="Zipkin" src="https://user-images.githubusercontent.com/14878408/65939165-bb213180-e442-11e9-9ad7-5cfd4fa121ef.png">

<hr>

**Screenshots of Monitoring in Graphana.**

<img width="1680" alt="Screen Shot 2019-10-16 at 9 16 21 PM" src="https://user-images.githubusercontent.com/14878408/66936473-65ac6d80-f05b-11e9-9e7d-9652059438cd.png">


<img width="1680" alt="Screen Shot 2019-10-16 at 9 16 12 PM" src="https://user-images.githubusercontent.com/14878408/66936524-79f06a80-f05b-11e9-8898-1002813aad8e.png">

<hr>

**Screenshots of Monitoring in Chronograf(TICK).**

![Screen Shot 2019-10-16 at 12 44 20 PM](https://user-images.githubusercontent.com/14878408/66934353-f8e3a400-f057-11e9-82ab-eda7a230c09d.png)

![Screen Shot 2019-10-16 at 12 52 08 PM](https://user-images.githubusercontent.com/14878408/66934482-2e888d00-f058-11e9-8dea-f1f275765265.png)

<hr>

> Account Service

To Get `access_token` for the user, you need `clientId` and `clientSecret`

```
clientId : '93ed453e-b7ac-4192-a6d4-c45fae0d99ac'
clientSecret : 'client.devd123'
```

There are 2 users in the system currently. 
ADMIN, NORMAL USER

```
Admin 
userName: 'admin.admin'
password: 'admin.devd123'
```

```
Normal User 
userName: 'devd.cores'
password: 'cores.devd123'
```

*To get the accessToken (Admin User)* 

```curl 93ed453e-b7ac-4192-a6d4-c45fae0d99ac:client.devd123@localhost:4001/oauth/token -d grant_type=password -d username=admin.admin -d password=admin.devd123```

<hr>

## Roadmap

1. Start Bookstore-react frontend project.
2. Start Bookstore-payment-service.
3. Start DevOps CICD using Terraform/Ansible/Cloudformation.(Least Priority)