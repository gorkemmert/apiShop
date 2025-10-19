## JSON Server (local REST API)

### Kurulum
cd api
npm i
npm run seed        # FakeStore'dan ürünleri alır ve db.json'a yazar
npm start           # http://localhost:4000

### Endpointler
GET    /products
GET    /products/:id
POST   /orders                  { userId, items:[{productId,qty}], total }


