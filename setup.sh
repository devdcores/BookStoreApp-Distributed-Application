cd /DevD/POC/BookStoreApp-Distributed-Application/bookstore-account-service
mvn clean package -Dskip-docker-plugin=false

cd /DevD/POC/BookStoreApp-Distributed-Application/bookstore-billing-service
mvn clean package -Dskip-docker-plugin=false

cd /DevD/POC/BookStoreApp-Distributed-Application/bookstore-catalog-service
mvn clean package -Dskip-docker-plugin=false

cd /DevD/POC/BookStoreApp-Distributed-Application/bookstore-eureka-discovery-service
mvn clean package -Dskip-docker-plugin=false

cd /DevD/POC/BookStoreApp-Distributed-Application/bookstore-api-gateway-service
mvn clean package -Dskip-docker-plugin=false
