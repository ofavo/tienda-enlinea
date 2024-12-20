# Tienda en Línea - API

## Description
API REST para una tienda en línea construida con NestJS y MongoDB. Esta API proporciona endpoints para gestionar productos, categorías, usuarios y listas de deseos.

## Requisitos Previos
- Docker v20.10 o superior
- Docker Compose v2.0 o superior
- Git

## Configuración del Proyecto

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd tienda-enlinea
```

### 2. Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
# Puerto de la aplicación
PORT=4000

# Conexión a MongoDB
MONGODB_URI=mongodb://mongodb:27017/tienda-enlinea

# Configuración JWT
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRATION=24h

# Entorno
NODE_ENV=production
```

## Despliegue en VPS

### 1. Preparación del Servidor
```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Despliegue de la Aplicación
```bash
# Construir y levantar los contenedores
docker-compose up -d --build

# Verificar los logs
docker-compose logs -f
```

### 3. Verificar el Despliegue
La API estará disponible en `http://your-vps-ip:4000`
Swagger UI disponible en: `http://your-vps-ip:4000/api`

## Estructura Docker

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/tienda-enlinea
    depends_on:
      - mongodb
    networks:
      - tienda-network

  mongodb:
    image: mongo:6
    volumes:
      - mongodb_data:/data/db
    networks:
      - tienda-network

networks:
  tienda-network:
    driver: bridge

volumes:
  mongodb_data:
```

## API Endpoints

### Productos
```bash
# Listar productos
GET /products

# Crear producto
POST /products
{
  "name": "Smartphone XYZ",
  "description": "Último modelo con 5G",
  "price": 599.99,
  "category": "electronics",
  "stock": 100
}

# Obtener producto
GET /products/:id

# Actualizar producto
PUT /products/:id
{
  "price": 549.99,
  "stock": 95
}

# Eliminar producto
DELETE /products/:id
```

### Usuarios
```bash
# Registro
POST /users/register
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "name": "Usuario Ejemplo"
}

# Login
POST /users/login
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

## Mantenimiento

### Actualizar la Aplicación
```bash
# Detener los contenedores
docker-compose down

# Obtener últimos cambios
git pull

# Reconstruir y levantar
docker-compose up -d --build
```

### Backup de la Base de Datos
```bash
# Crear backup
docker exec tienda-mongodb mongodump --out /data/db/backup

# Copiar backup al host
docker cp tienda-mongodb:/data/db/backup ./backup

# Restaurar backup
docker exec tienda-mongodb mongorestore /data/db/backup
```

## Monitoreo
```bash
# Logs de la API
docker-compose logs -f api

# Logs de MongoDB
docker-compose logs -f mongodb

# Estado de los contenedores
docker-compose ps

# Uso de recursos
docker stats
```

## Optimizaciones Realizadas
1. **Imagen Base Ligera**: Uso de Alpine Linux para reducir el tamaño de la imagen
2. **Multi-stage Building**: Separación de etapas de construcción y producción
3. **Caché de Capas**: Optimización del orden de las instrucciones Docker
4. **Producción Only**: Solo dependencias necesarias en producción
5. **Restart Policies**: Configuración de reinicio automático para alta disponibilidad

## Seguridad
- Acceso a MongoDB restringido a la red Docker interna
- Variables de entorno para configuración sensible
- Contenedores con privilegios mínimos
- Encriptación de contraseñas con bcrypt
- Autenticación JWT para endpoints protegidos

## Troubleshooting

### 1. Problemas de Conexión
```bash
# Verificar logs
docker-compose logs

# Comprobar red Docker
docker network ls
docker network inspect tienda-network

# Verificar estado de los contenedores
docker-compose ps
```

### 2. Errores de MongoDB
```bash
# Verificar volúmenes
docker volume ls
docker volume inspect tienda-enlinea_mongodb_data

# Comprobar logs de MongoDB
docker-compose logs mongodb

# Verificar conexión desde la API
docker exec tienda-api ping mongodb
```

### 3. Problemas de Rendimiento
```bash
# Monitorear recursos
docker stats

# Verificar logs en tiempo real
docker-compose logs -f

# Inspeccionar contenedor
docker inspect tienda-api
