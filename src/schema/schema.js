"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    login(email: String!, password: String!): AuthPayload
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    logout(token: String!): LogoutResponse
  }

  type AuthPayload {
    token: String!
  }

  type LogoutResponse {
    message: String!
  }
`);
exports.default = schema;
