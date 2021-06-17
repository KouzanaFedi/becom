// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers/index';
import { connectDB } from './utils/db';
import { getPayload } from './utils/util';
import http from 'http';

import 'dotenv/config';

import express from 'express';
import path from 'path';

const DB_URL = process.env.DB_URI;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscription',
    onConnect: async (_, __, ___) =>
    {
      console.log(`Subscription client connected.`)
    },
    onDisconnect: async (_, __) =>
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

app.use("/public", express.static(path.join(__dirname, '..', 'public')));

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () =>
{
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
});
