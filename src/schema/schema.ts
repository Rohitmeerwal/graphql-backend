import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    _: Boolean # Placeholder for possible future queries
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout(token: String!): LogoutResponse
  }

  type AuthPayload {
    token: String!
  }

  type LogoutResponse {
    message: String!
  }
`);

export default schema;