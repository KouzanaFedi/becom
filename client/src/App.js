import { ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecupPassword from "./pages/RecupPassword";
import AuthProtectedRoute from "./routers/AuthProtectedRoute";
import SharedSchedule from "./pages/ScharedSchedule";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Screen404 from "./pages/Screen404";
import InvalideRoute from "./routers/InvalideRoute";
import getTheme from "./styles/customTheme";

function App()
{
  const customTheme = getTheme({ mode: 'light' });

  return (
    <ThemeProvider theme={customTheme} >
      <div className="App">
        <Switch>
          <AuthProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recup" component={RecupPassword} />
          <AuthProtectedRoute path="/dashboard/:section" component={Dashboard} />
          <Route path="/shared_schedule/:token" component={SharedSchedule} />
          <Route exact path="/404" component={Screen404} />
          <InvalideRoute />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
