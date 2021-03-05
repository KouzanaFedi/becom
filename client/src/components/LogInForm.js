import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../api/auth";
import { AUTH_TOKEN } from "../utils/constants";

const LogInForm = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });

  const [loginQuery, { loading }] = useLazyQuery(LOGIN, {
    variables: { name: formState.name, password: formState.password },
    onCompleted: ({ login }) => {
      console.log(login);
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push("/home");
    },
  });

  function handleNameChange(event) {
    setFormState({ ...formState, name: event.target.value });
  }
  function handlePasswordChange(event) {
    setFormState({ ...formState, password: event.target.value });
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleNameChange}
        value={formState.name}
        placeholder="name"
      />
      <br />
      <input
        type="password"
        onChange={handlePasswordChange}
        value={formState.password}
        placeholder="password"
      />
      <br />
      <button onClick={loginQuery}>Log In</button>
      {loading && <div> loading... </div>}
    </div>
  );
};

export default LogInForm;
