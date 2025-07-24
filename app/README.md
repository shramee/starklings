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

1. Create a new database named `starklings-test`. This example uses DBeaver to create a connection to PostgreSQL and then create the database.

   <img width="805" alt="Screenshot 2025-04-25 at 12 14 54 PM" src="https://github.com/user-attachments/assets/c4161f4e-8102-47e2-bffc-a2b836192abc" />
   
2. Once the connection is established, create a new query and execute the [init.sql](./database/init.sql) file.

   <img width="539" alt="Screenshot 2025-04-25 at 12 26 58 PM" src="https://github.com/user-attachments/assets/dacac140-2b0e-4c69-b243-a1fc3b9783ae" />
   
3. After the table is created, configure the [.env](./api/.env) file. You can copy the [.env.example](./api/.env.example) file and modify it with your own values.

   <img width="306" alt="Screenshot 2025-04-25 at 12 37 42 PM" src="https://github.com/user-attachments/assets/77051a3a-1e4b-4bee-b9df-1a79a6681a48" />


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

<img width="402" alt="Screenshot 2025-04-25 at 12 38 49 PM" src="https://github.com/user-attachments/assets/77cfe6ea-6592-49f6-b1f8-283db83939ec" />

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
