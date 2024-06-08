<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

API REST (CRUD) implementada en NestJs, empleando MongoDB, JWT, Loggers, Filters

## Installation

### Clonar el repositorio en el local

### instalar las dependencias npm install

### Abir Docker Desktop

### En la terminal de VsCode dentro del proyecto ejecutar el comando (docker-compose up -d) el cual esta implementado en un archivo de nombre: docker-compose.yml

### Una vez levante los servicios de docker con MongoDB, puede consumir los endpoints.

### Para Levantar el backend se debe ejecutar npm run start o npm run start:dev para habilitar el modo --watch.

### Se debe realizar primero el Login para obtener el token y poder realizar las demas consultas.

##EndPoint para Login
http://localhost:3000/api/login/v1/signIn se debe de enviar un json { "email": xxx}
##EndPoint para consultar las demas actividades
http://localhost:3000/api/finance/transactions/v1/nameRoutes
nameRoutes (deposit, withdraw, balance,movements, delete)
Para Eliminar: http://localhost:3000/api/finance/transactions/v1/delete?productID=xxxxxx
