# GraphQL Backend Test (WIP)

This is a simple GraphQL API server built using:

-   **Node.js**
-   **Express**
-   **MongoDB + Mongoose**
-   **GraphQL / Apollo Server**

The project includes full CRUD functionality for: - Users\
- Posts\
- Comments

> **⚠️ Status:** This project is **still under development**. More
> features will be added soon.

------------------------------------------------------------------------

## 🚀 Features

-   User registration & login (JWT authentication)
-   Create, update, delete posts
-   Comment system
-   Protected resolvers using middleware
-   Clean modular folder structure

------------------------------------------------------------------------

## 📁 Project Structure

    graphql-backend-test/
    ├─ src/
    │  ├─ models/
    │  │  ├─ User.js
    │  │  ├─ Post.js
    │  │  └─ Comment.js
    │  ├─ schema/
    │  │  ├─ typeDefs.js
    │  │  └─ resolvers.js
    │  ├─ utils/
    │  │  ├─ auth.js
    │  │  └─ validators.js
    │  ├─ server.js
    │  └─ config.js
    ├─ tests/
    │  └─ user.test.js
    ├─ .env.example
    ├─ package.json
    └─ README.md

------------------------------------------------------------------------

## 🛠 Installation

Install dependencies:

``` bash
npm install
```

Create `.env` file and add:

    MONGO_URI=your_mongo_connection
    JWT_SECRET=your_secret
    PORT=5000

------------------------------------------------------------------------

## ▶️ Running the Server

Start the development server:

``` bash
npm run dev
```

GraphQL server will run at:

    http://localhost:5000/graphql

------------------------------------------------------------------------

## 🧪 Example GraphQL Operations

### Register User

``` graphql
mutation {
  register(username: "testuser", email: "test@mail.com", password: "123456") {
    id
    username
    token
  }
}
```

### Login

``` graphql
mutation {
  login(email: "test@mail.com", password: "123456") {
    id
    username
    token
  }
}
```

### Add Authorization Header

To create a post, add this in GraphiQL **HTTP Headers**:

``` json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

### Create Post

``` graphql
mutation {
  createPost(title: "My Post", body: "This is a sample post") {
    id
    title
    body
  }
}
```

### Get All Posts

``` graphql
{
  posts {
    id
    title
    body
    createdAt
    user {
      username
    }
  }
}
```

------------------------------------------------------------------------

## 📌 Status

This backend is **work-in-progress**.\
More features, optimizations, and testing will be added soon.
