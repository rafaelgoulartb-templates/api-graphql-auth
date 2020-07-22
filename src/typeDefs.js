module.exports = `
  type User {
    _id: ID!
    name: String!
    email: String!
    created_at: String
    token: String!
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;
