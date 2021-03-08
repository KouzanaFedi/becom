// import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../../api/auth";
import { AUTH_TOKEN } from "../../utils/constants";
import { useSelector } from "react-redux";
import { logInName, logInPassword } from "../../redux/slices/logInReducer";
import LogInName from "./LogInName";
import LogInPassword from "./LogInPassword";
const LogInForm = () => {
  const history = useHistory();

  const name = useSelector(logInName);
  const password = useSelector(logInPassword);

  const [loginQuery, { loading }] = useLazyQuery(LOGIN, {
    variables: { name: name.value, password: password.value },
    onCompleted: ({ login }) => {
      console.log(login);
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push("/home");
    },
  });

  function handleLogIn(event) {
    event.preventDefault();
    if (name.ready && password.ready) {
      loginQuery();
    }
  }

  return (
    <div>
      <LogInName />
      <LogInPassword />

      <button onClick={handleLogIn}>Log In</button>
      {loading && <div> loading... </div>}
    </div>
  );
};

export default LogInForm;
