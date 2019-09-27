#author : Devaraj Reddy

#One touch file to build all required docker images.
#Docker engine should be running before running the script.

ProjectPath=$(pwd)

echo "Building eureka-server image"
cd $ProjectPath/bookstore-eureka-discovery-service
docker image build --build-arg JAR_FILE=bookstore-eureka-discovery-service-0.0.1-SNAPSHOT.jar -t eureka-server .
echo ""

echo "Building gateway-server image"
cd $ProjectPath/bookstore-api-gateway-service
docker image build --build-arg JAR_FILE=bookstore-api-gateway-service-0.0.1-SNAPSHOT.jar -t gateway-server .
echo ""

echo "Building account-service image"
cd $ProjectPath/bookstore-account-service
docker image build --build-arg JAR_FILE=bookstore-account-service-0.0.1-SNAPSHOT.jar -t account-service .
echo ""

echo "Building billing-service image"
cd $ProjectPath/bookstore-billing-service
docker image build --build-arg JAR_FILE=bookstore-billing-service-0.0.1-SNAPSHOT.jar -t billing-service .
echo ""

echo "Building catalog-service image"
cd $ProjectPath/bookstore-catalog-service
docker image build --build-arg JAR_FILE=bookstore-catalog-service-0.0.1-SNAPSHOT.jar -t catalog-service .
echo ""

echo "Building order-service image"
cd $ProjectPath/bookstore-order-service
docker image build --build-arg JAR_FILE=bookstore-order-service-0.0.1-SNAPSHOT.jar -t order-service .
echo ""
