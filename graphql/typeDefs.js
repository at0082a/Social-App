const { gql } = require('apollo-server');

module.exports = gql`
  type Post{
    id: ID!,
    username: String!,
    body: String!,
    createdAt: String!    
  }

  type User{
    id: ID!,
    email: String!,
    token: String!,
    username: String!,
    createdAt: String!
  }

  input RegisterInput{
    username: String!,
    confirmPassword: String!,
    email: String!,
    password: String!
  }

  input LoginInput{
    username: String!,
    password: String!
  }

  type Mutation{
    login(loginInput: LoginInput): User!
    register(registerInput: RegisterInput): User!
    createPost(body: String): Post!
    deletePost(id: ID!): String!
  }

  type Query{
    getPost(id: ID!): Post
    getPosts: [Post]
  }
`;
