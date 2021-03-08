import { useDispatch, useSelector } from "react-redux";
import { logInName, setName } from "../../redux/slices/logInReducer";

const LogInName = () => {
  const dispatch = useDispatch();
  const name = useSelector(logInName);

  function handleNameChange(event) {
    dispatch(setName({ name: event.target.value }));
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleNameChange}
        value={name.value}
        placeholder="name"
      />
    </div>
  );
};
export default LogInName;
