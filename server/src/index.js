import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers/index';
import { connectDB } from './utils/db';
import { getPayload } from './utils/util';

import 'dotenv/config';

const DB_URL = process.env.DB_URI;
//const config = require('./config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    connectDB(DB_URL);

    // get the user token from the headers
    const token = req.headers.authorization || '';
    // try to retrieve a user with the token
    const { payload: user, loggedIn } = getPayload(token);

    // add the user to the context
    return { user, loggedIn };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
