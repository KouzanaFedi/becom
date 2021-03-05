import { useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../utils/constants";
import Notif from "./Notif";

const Home = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  function handleLogOut() {
    localStorage.removeItem(AUTH_TOKEN);
    history.replace("/");
  }

  if (!token) return <h1>Login pls</h1>;
  else
    return (
      <div>
        <h1>Welcome </h1>
        <br />
        <Notif />
        <br />
        <button onClick={handleLogOut}>Log out</button>
      </div>
    );
};

export default Home;
