import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider, split, ApolloClient, InMemoryCache, ApolloLink, concat } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AUTH_TOKEN } from "./utils/constants";
import { API, SUBSCRIPTION } from "./config";
import { createUploadLink } from 'apollo-upload-client';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateAdapter from '@material-ui/lab/AdapterMoment';


import "./index.css";
import "dotenv/config";

const token = localStorage.getItem(AUTH_TOKEN);

const wsLink = new WebSocketLink({
  uri: `ws://${SUBSCRIPTION}`,
  options: { reconnect: true, connectionParams: { authToken: token ? token : '' }, },
});

const httpLink = new createUploadLink({
  uri: `http://${API}`,
});

const authMiddleware = new ApolloLink((operation, forward) =>
{
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    }
  });

  return forward(operation);
});

const splitLink = split(
  ({ query }) =>
  {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  concat(authMiddleware, httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>

        <LocalizationProvider dateAdapter={DateAdapter}>
          <App />
        </LocalizationProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>, document.getElementById("root")
);

