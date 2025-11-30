const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    post: Post!
  }

  type Query {
    users: [User]
    posts: [Post]
    comments: [Comment]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User

    createPost(title: String!, body: String!): Post
    updatePost(id: ID!, title: String!, body: String!): Post
    deletePost(id: ID!): Post

    createComment(postId: ID!, text: String!): Comment
  }
`;

module.exports = typeDefs;
