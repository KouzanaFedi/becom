import { useDispatch, useSelector } from "react-redux";
import { logInPassword, setPassword } from "../../redux/slices/logInReducer";

const LogInPassword = () => {
  const dispatch = useDispatch();
  const password = useSelector(logInPassword);

  function handlePasswordChange(event) {
    dispatch(setPassword({ password: event.target.value }));
  }

  return (
    <div>
      <input
        type="password"
        onChange={handlePasswordChange}
        value={password.value}
        placeholder="password"
      />
    </div>
  );
};
export default LogInPassword;
