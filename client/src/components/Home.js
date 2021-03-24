import { useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../utils/constants";

const Home = () =>
{
  const token = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();
  if (!token) history.replace('/login');

  function handleLogOut()
  {
    localStorage.removeItem(AUTH_TOKEN);
    history.replace("/");
  }

  return (
    <div>
      <h1>Welcome </h1>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default Home;
