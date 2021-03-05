import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Landing page</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Header;
