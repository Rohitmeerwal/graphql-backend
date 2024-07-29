"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const database_1 = __importDefault(require("./config/database"));
const schema_1 = __importDefault(require("./schema/schema"));
const authResolver_1 = require("./resolvers/authResolver");
const app = (0, express_1.default)();
(0, database_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    rootValue: authResolver_1.authResolver,
    graphiql: true,
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
