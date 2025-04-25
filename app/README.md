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

#### Database Setup

If you're running the backend for the first time, you need to configure the database connection:

1. Create a table in the database. This example uses DBeaver to create a connection to PostgreSQL and then create the table.
2. Once the connection is established, create a new query and execute the [init.sql](./database/init.sql) file.
3. After the table is created, configure the [.env](./api/.env) file. You can copy the [.env.example](./api/.env.example) file and modify it with your own values.

#### Running the Backend

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

To test the database connection, you can use the ping endpoint:

```bash
curl http://localhost:3000/api/ping
```

You should see a response indicating that the connection is working properly.

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
