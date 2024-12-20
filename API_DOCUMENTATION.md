# API Documentation - Tienda en Línea

Esta documentación proporciona ejemplos de cómo utilizar cada endpoint de la API.

## Base URL
```
http://localhost:3000
```

## Usuarios (Users)

### Crear Usuario
```http
POST /users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Obtener Todos los Usuarios
```http
GET /users
```

### Obtener Usuario por ID
```http
GET /users/{id}
```

### Actualizar Usuario
```http
PATCH /users/{id}
Content-Type: application/json

{
  "firstName": "John Updated",
  "lastName": "Doe Updated"
}
```

### Eliminar Usuario
```http
DELETE /users/{id}
```

## Productos (Products)

### Crear Producto
```http
POST /products
Content-Type: application/json

{
  "name": "Laptop Gaming",
  "description": "Laptop gaming de alta gama",
  "price": 1299.99,
  "stock": 10,
  "categoryId": "category-id-here"
}
```

### Obtener Todos los Productos
```http
GET /products
```

### Obtener Producto por ID
```http
GET /products/{id}
```

### Actualizar Producto
```http
PUT /products/{id}
Content-Type: application/json

{
  "name": "Laptop Gaming Pro",
  "price": 1399.99,
  "stock": 15
}
```

### Eliminar Producto
```http
DELETE /products/{id}
```

## Categorías (Categories)

### Crear Categoría
```http
POST /categories
Content-Type: application/json

{
  "name": "Electrónicos",
  "description": "Productos electrónicos y gadgets"
}
```

### Obtener Todas las Categorías
```http
GET /categories
```

### Obtener Categoría por ID
```http
GET /categories/{id}
```

### Actualizar Categoría
```http
PUT /categories/{id}
Content-Type: application/json

{
  "name": "Electrónicos y Computación",
  "description": "Productos electrónicos, gadgets y computadoras"
}
```

### Eliminar Categoría
```http
DELETE /categories/{id}
```

## Lista Blanca (Whitelist)

### Crear Entrada en Lista Blanca
```http
POST /whitelist
Content-Type: application/json

{
  "email": "allowed@example.com",
  "description": "Cliente VIP"
}
```

### Obtener Todas las Entradas de Lista Blanca
```http
GET /whitelist
```

### Obtener Entrada de Lista Blanca por ID
```http
GET /whitelist/{id}
```

### Actualizar Entrada de Lista Blanca
```http
PUT /whitelist/{id}
Content-Type: application/json

{
  "email": "updated@example.com",
  "description": "Cliente Premium VIP"
}
```

### Eliminar Entrada de Lista Blanca
```http
DELETE /whitelist/{id}
```

## Pruebas con cURL

Aquí hay algunos ejemplos de cómo probar los endpoints usando cURL:

### Crear un Usuario
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Crear una Categoría
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electrónicos",
    "description": "Productos electrónicos y gadgets"
  }'
```

### Crear un Producto
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming",
    "description": "Laptop gaming de alta gama",
    "price": 1299.99,
    "stock": 10,
    "categoryId": "category-id-here"
  }'
```

## Notas Importantes

1. Reemplaza `{id}` en las URLs con el ID real del recurso.
2. Asegúrate de que el servidor esté corriendo en `http://localhost:3000` antes de hacer las pruebas.
3. Los IDs generalmente son strings UUID, asegúrate de usar el formato correcto.
4. Todos los endpoints que requieren un body esperan datos en formato JSON.
5. Para probar los endpoints que requieren autenticación, asegúrate de incluir el token JWT en el header de la petición:
   ```
   Authorization: Bearer your-jwt-token
   ```
