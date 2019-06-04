#author : Devaraj Reddy

#One touch file to build all required docker images.
#Docker engine should be running before running the script.

ProjectPath=$(pwd)

echo "Building account-service image"
cd $ProjectPath/bookstore-account-service
docker image build -t account-service .
echo ""

echo "Building billing-service image"
cd $ProjectPath/bookstore-billing-service
docker image build -t billing-service .
echo ""

echo "Building catalog-service image"
cd $ProjectPath/bookstore-catalog-service
docker image build -t catalog-service .
echo ""

echo "Building eureka-server image"
cd $ProjectPath/bookstore-eureka-discovery-service
docker image build -t eureka-server .
echo ""

echo "Building gateway-server image"
cd $ProjectPath/bookstore-api-gateway-service
docker image build -t gateway-server .
echo ""
