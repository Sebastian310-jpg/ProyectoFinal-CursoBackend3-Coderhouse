# Pet Adoption API

Este es mi proyecto final del curso Backend 3 de Coderhouse. Se trata de una API REST desarrollada con Node.js, Express y MongoDB que permite gestionar usuarios, mascotas y adopciones. Además, incluye documentación con Swagger, tests funcionales para `adoptions.routes.js` y dockerización para facilitar su ejecución y despliegue.

---

## Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* Jest
* Supertest
* MongoDB Memory Server
* Swagger
* Docker

---

## Funcionalidades

* Gestión de usuarios.
* Gestión de mascotas.
* Gestión de adopciones.
* Documentación con Swagger.
* Ejecución con Docker.

---

## Estructura del proyecto

```bash
ProyectoFinal/
├── src/
│   ├── config/
│   │   ├── db.config.js
│   │   ├── env.config.js
│   │   └── swagger.config.js
│   ├── controllers/
│   │   ├── adoptions.controller.js
│   │   ├── pets.controller.js
│   │   └── users.controller.js
│   ├── dao/
│   │   ├── adoptions.dao.js
│   │   ├── pets.dao.js
│   │   └── users.dao.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── adoption.model.js
│   │   ├── pet.model.js
│   │   └── user.model.js
│   ├── repositories/
│   │   ├── adoptions.repository.js
│   │   ├── pets.repository.js
│   │   └── users.repository.js
│   ├── routes/
│   │   ├── adoptions.routes.js
│   │   ├── pets.routes.js
│   │   └── users.routes.js
│   ├── services/
│   │   ├── adoptions.service.js
│   │   ├── pets.service.js
│   │   └── users.service.js
│   ├── utils/
│   │   ├── errors/
│   │   │   ├── AuthError.js
│   │   │   ├── CustomError.js
│   │   │   ├── NotFoundError.js
│   │   │   └── ValidationError.js
│   │   └── bcrypt.js
│   ├── app.js
│   └── server.js
├── tests/
│   └── adoptions.routes.test.js
├── .dockerignore
├── .env.development
├── .env.example
├── .env.production
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

---

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/Sebastian310-jpg/ProyectoFinal-CursoBackend3-Coderhouse.git
cd ProyectoFinal-CursoBackend3-Coderhouse
```

### Instalar dependencias

```bash
npm install
```

## Variables de entorno

Este proyecto utiliza distintos archivos de configuración según el entorno de ejecución.

* `.env.development`: variables para desarrollo local.
* `.env.production`: variables para producción o Docker.
* `.env.example`: plantilla de referencia con las variables necesarias.

### Configuración inicial

Antes de ejecutar el proyecto, copiar el archivo de ejemplo y completa los valores correspondientes:

```bash
cp .env.example .env.development
```

## Variables de entorno requeridas

| Variable   | Descripción                           |
| ---------- | ------------------------------------- |
| PORT       | Puerto donde se ejecuta la aplicación |
| MONGO_URI  | URI de conexión a MongoDB             |

---

### Entornos disponibles

* **Desarrollo**

```bash
npm run dev
```

* **Producción**

```bash
npm start
```

* **Docker**

El contenedor utiliza las variables definidas en `.env.production`:

```bash
docker run --env-file .env.production -p 8080:8080 sebst04/pet-adoption-api:latest
```

La API estará disponible en:

```bash
http://localhost:8080
```

---

## Documentación Swagger

Una vez iniciado el servidor, se puede acceder a la documentación en:

```bash
http://localhost:8080/api/docs
```

---

## Ejecutar los tests

Para correr todos los tests:

```bash
npm test
```

Para ejecutar únicamente los tests de adopciones:

```bash
npm test -- adoptions.routes.test.js
```

---

## Docker

### Construir la imagen

```bash
docker build -t sebst04/pet-adoption-api:latest .
```

### Ejecutar el contenedor

```bash
docker run -p 8080:8080 --env-file .env.production sebst04/pet-adoption-api:latest
```

La aplicación estará disponible en:

```bash
http://localhost:8080
```

---

## Docker Hub

La imagen pública se encuentra disponible en:

```bash
https://hub.docker.com/r/sebst04/pet-adoption-api
```

---

## Scripts disponibles

```bash
npm run dev   # Ejecuta la aplicación en modo desarrollo
npm start     # Ejecuta la aplicación en producción
npm test      # Ejecuta todos los tests
```

---

## Endpoints principales

### Usuarios

* GET `/api/users`
* GET `/api/users/:uid`
* POST `/api/users`
* PUT `/api/users/:uid`
* DELETE `/api/users/:uid`

### Mascotas

* GET `/api/pets`
* GET `/api/pets/:pid`
* GET `/api/pets/specie/:specie`
* POST `/api/pets`
* PUT `/api/pets/:pid`
* DELETE `/api/pets/:pid`

### Adopciones

* GET `/api/adoptions`
* GET `/api/adoptions/:aid`
* POST `/api/adoptions`
* DELETE `/api/adoptions/:aid`

---

## Autor

Sebastian Stahler

---

## Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de Backend 3 de Coderhouse.