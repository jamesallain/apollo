import express from 'express';
import Schema from './data/schema';
import Resolvers from './data/resolvers';
//import { apolloServer } from 'graphql-tools';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import cors from 'cors';


const GRAPHQL_PORT = 8080;

const graphQLServer = express();
graphQLServer.use('*', cors({ origin: 'http://localhost:${GRAPHQL_PORT}/' }));


// graphQLServer.use('/graphql', apolloServer({
//   graphiql: true,
//   pretty: true,
//   schema: Schema,
//   resolvers: Resolvers,
// }));



const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
});

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {},
}));


graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
