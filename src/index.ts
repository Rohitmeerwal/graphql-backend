
import express from 'express';
import cors from 'cors';  
import { graphqlHTTP } from 'express-graphql';
import connectDB from './config/database';
import schema from './schema/schema';
import { authResolver } from './resolvers/authResolver';

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: authResolver,
  graphiql: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

