import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, HttpLink, split, ApolloClient, InMemoryCache, ApolloLink, concat } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AUTH_TOKEN } from "./utils/constants";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { API } from "./config";

import "./index.css";
import "dotenv/config";

const token = localStorage.getItem(AUTH_TOKEN);

const wsLink = new WebSocketLink({
  uri: `ws://${API}/subscription`,
  options: { reconnect: true, connectionParams: { authToken: token ? token : '' }, },
});

const httpLink = new HttpLink({
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
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
