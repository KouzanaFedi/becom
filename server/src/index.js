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
  subscriptions: {
    path: '/subscription',
    onConnect: async (connectionParams, webSocket, context) =>
    {
      console.log(`Subscription client connected.`)
    },
    onDisconnect: async (webSocket, context) =>
    {
      console.log(`Subscription client disconnected.`)
    }
  },
  context: ({ req, connection }) =>
  {
    connectDB(DB_URL);
    if (connection) {
      return {
        ...connection.context,
      };
    };

    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];

    const { payload: user, loggedIn } = getPayload(token);

    return { user, loggedIn };
  },
});

server.listen().then(({ url }) =>
{
  console.log(`🚀  Server ready at ${url}`);
});
