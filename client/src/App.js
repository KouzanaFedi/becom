import { ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import customTheme from "./styles/customTheme";
import Home from "./components/Home";
import Login from "./pages/Login";
// import { AUTH_TOKEN } from "./utils/constants";
import Register from "./pages/Register";
import RecupPassword from "./pages/RecupPassword";
import Dashboard from "./pages/Dashboard";
import AuthProtectedRoute from "./routers/AuthProtectedRoute";
import SharedSchedule from "./pages/ScharedSchedule";

function App()
{
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recup" component={RecupPassword} />
          <AuthProtectedRoute path="/dashbord" component={Dashboard} />
          <Route path="/shared_schedule/:token" component={SharedSchedule} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
