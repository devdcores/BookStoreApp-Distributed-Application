# 👕 ClothingStore Setup Instructions

## 🎯 Quick Setup cho máy khác

### **Prerequisites**
- Docker Desktop installed and running
- Java 8+ (recommended: JDK 1.8.0_202)
- Maven
- Git

### **Step 1: Clone Repository**
```bash
git clone https://github.com/mihuyen/clothing-store.git
cd clothing-store
```

### **Step 2: Build JAR với V3 Migration**
```bash
# Set Java 8 environment (if multiple Java versions)
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_202
set PATH=%JAVA_HOME%\bin;%PATH%

# Build catalog service with clothing data migration
cd bookstore-catalog-service
mvn clean package -DskipTests
cd ..

# Build other services
mvn clean install -DskipTests
```

### **Step 3: Verify V3 Migration exists**
```bash
# Check if clothing migration file exists
dir bookstore-catalog-service\src\main\resources\db\migration\V3__clothing_store_data.sql

# Should see: V3__clothing_store_data.sql (contains clothing data)
```

### **Step 4: Start Services**
```bash
# Start all microservices (uses H2 local profile)
docker-compose up --build -d

# Wait 2-3 minutes for services to fully start
```

### **Step 5: Verify ClothingStore Data**
```bash
# Test API - should return 8 clothing items (not books!)
curl "http://localhost:8765/api/catalog/products?page=0&size=8"

# Expected response: T-Shirts, Jeans, Dresses
# - Classic White T-Shirt - Nike ($25.99)
# - Vintage Band Tee - H&M ($19.99)
# - Slim Fit Jeans - Levis 511 ($79.99)
# etc...
```

### **Step 6: Start React Frontend**
```bash
cd bookstore-frontend-react-app
npm install --legacy-peer-deps
npm start

# Open: http://localhost:3000
# Should see: ClothingStore branding with fashion items
```

## 🔧 Troubleshooting

### **Problem: Still seeing books instead of clothes**

**Check 1: Profile**
```bash
docker logs bookstore-catalog-service | findstr "profiles are active"
# Should show: "local" (not "docker")
```

**Check 2: Migration applied**
```bash
docker logs bookstore-catalog-service | findstr "migration"
# Should show: "Successfully applied 3 migrations"
# Including: "version 3 - clothing store data"
```

**Check 3: Database URL**
```bash
docker logs bookstore-catalog-service | findstr "Database"
# Should show: "jdbc:h2:mem:bookstore_db" (not MySQL)
```

**Fix: Rebuild and restart**
```bash
# If problems persist:
cd bookstore-catalog-service
mvn clean package -DskipTests
cd ..
docker-compose down
docker-compose up --build bookstore-catalog-service -d
```

### **Problem: Services not starting**
```bash
# Check logs
docker ps
docker logs bookstore-catalog-service
docker logs bookstore-api-gateway-service
```

### **Problem: Frontend compile errors**
```bash
cd bookstore-frontend-react-app
npm install --legacy-peer-deps --force
npm start
```

## 📊 Expected Results

### **API Response (Clothing Data):**
```json
{
  "page": {
    "content": [
      {
        "productId": "1",
        "productName": "Classic White T-Shirt - Nike",
        "price": 25.99,
        "productCategory": "T-Shirts",
        "availableItemCount": 50
      }
    ],
    "totalElements": 8
  }
}
```

### **Frontend Features:**
- 👕 ClothingStore branding (orange gradient)
- 🏷️ Category badges (T-Shirts, Jeans, Dresses)
- 💰 Price display with stock info
- ⭐ Rating system
- 🛒 Shopping cart functionality

## 🌐 Service URLs
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8765
- **Catalog Service**: http://localhost:6001
- **H2 Console**: http://localhost:6001/h2-console
  - JDBC URL: `jdbc:h2:mem:bookstore_db`
  - Username: `sa`
  - Password: (empty)

## 🎊 Success Indicators
✅ Frontend shows "Latest Fashion" title
✅ Products show clothing brands (Nike, H&M, Levis, etc.)
✅ Categories show T-Shirts, Jeans, Dresses
✅ Prices match: $25.99, $19.99, $79.99, etc.
✅ Orange ClothingStore branding in header