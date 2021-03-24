import { ThemeProvider } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import customTheme from "./styles/customTheme";
import Home from "./components/Home";
import Login from "./pages/Login";
import { AUTH_TOKEN } from "./utils/constants";
import Register from "./pages/Register";
import RecupPassword from "./pages/RecupPassword";

function App()
{
  const history = useHistory();
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    history.replace("/home");
  }
  return (
    <ThemeProvider theme={customTheme} dark>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recup" component={RecupPassword} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
