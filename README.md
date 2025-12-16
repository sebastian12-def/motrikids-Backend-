# MOTRIKIDS – Backend

Backend del proyecto MOTRIKIDS desarrollado con Node.js, Express, MySQL y MongoDB.

---

## Tecnologías
- Node.js
- Express
- MySQL
- MongoDB (Mongoose)

---

## Requisitos
- Node.js
- MySQL
- MongoDB
- Git

---

## Clonar el repositorio
```bash
git clone https://github.com/sebastian12-def/motrikids-Backend-.git
cd motrikids-Backend--main
Instalar dependencias
bash
Copiar código
npm install
Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

env:
Copiar código:
PORT=8000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=motrikids
DB_PORT=3306

MONGO_URI=mongodb://localhost:27017/motrikids
Base de datos MySQL
Crear la base de datos:

sql:
Copiar código:
CREATE DATABASE motrikids;
Ejecutar el proyecto
bash
Copiar código
npm run dev
Si todo está correcto, el servidor quedará activo en:

arduino
Copiar código
http://localhost:8000
Endpoints principales
Obtener niños:

bash
Copiar código
GET /api/mongo/ninos
Obtener niño por ID:

bash
Copiar código
GET /api/mongo/ninos/:id
Crear niño:

bash
Copiar código
POST /api/mongo/ninos
Actualizar niño:

bash
Copiar código
PUT /api/mongo/ninos/:id
Eliminar niño:

bash
Copiar código
DELETE /api/mongo/ninos/:id
Pruebas
Los endpoints pueden probarse usando Postman
