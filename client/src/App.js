import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Greetings from "./components/Greetings";
import Header from "./components/Header";
import Home from "./components/Home";
import LogInForm from "./components/logInForm/LogInForm";
import { AUTH_TOKEN } from "./utils/constants";

function App() {
  const history = useHistory();
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    history.replace("/home");
  }
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Greetings} />
        <Route exact path="/login" component={LogInForm} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
