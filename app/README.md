<p align="center">
  <img alt="Starklings logo" width="150" src="https://avatars.githubusercontent.com/oa/2511820?s=240&u=cd5bd4a66a696036e63d3169ba5f5fc8c06fdeeb&v=4">
</p>

# Starklings App

A web-based interactive tutorial to learn Cairo and Starknet.

## About

The Starklings App is an interactive web platform designed to assist users in embarking on their journey to learn Cairo. This platform is built upon [Starklings](https://github.com/shramee/starklings-cairo1) exercises, which are considered essential for beginners seeking to grasp the fundamentals of Cairo.

Our objective is to simplify the Starklings experience by eliminating complex configurations and installations. Simply access the app through your browser and begin coding.


## Components

### Backend

The backend of the Starklings App is responsible for handling data processing and interactions with the Starknet exercises. 
Follow these steps to set up and run the backend:

Si es la primera vez que se ejecuta el backend debes configurar la conexion a la base de datos:

Necesitamos crear una tabla en la base de datos. En este caso estoy usando dbeaver para crear la conexion a postgres y luego crear la tabla.
(imagen creando la conexion en dbeaver)

Una vez creada la conexion, debo crear una nueva query y ejecutar el archivo init.sql
(imagen ejecutando el archivo init.sql)

Ya tenemos la tabla creada.

Ahora debemos configurar el archivo .env. En mi caso voy a copiar y pegar el archivo .env.example. Pero ustedes deben poner los valores que correspondan.
(imagen del archivo .env)

Ahora si, podemos ejecutar el backend:
```bash
cd api/
```

Install dependencies:

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

Para probar la conexion a la base de datos, podemos usar el endpoint de ping:
```bash
curl http://localhost:3000/api/ping
```

Deberiamos ver una respuesta similar a esta:
(imagen de la respuesta del endpoint de ping)

### Frontend

The frontend is the user interface of the Starklings App, providing an interactive environment for users to engage with Cairo exercises. 
To get the frontend up and running, follow these steps:

```bash
cd client/
```

Install dependencies:

```bash
npm i
```

Launch the development server:

```bash
npm run start
```
