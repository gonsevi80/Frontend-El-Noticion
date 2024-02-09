import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../assets/plumaymas.jpg";

const AuthUser = () => {
  const { user, logout } = useContext(AuthContext);
  const { VITE_API_URL } = import.meta.env;
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="user-container">
      {user ? (
        <div className="user-info">
          <Link className="boligrafo" to={`/users/profile`}>
            <img
              className={"user-avatar navbar-avatar"}
              src={
                user.avatar
                  ? `${VITE_API_URL}/uploads/${user.avatar}`
                  : userIcon
              }
              alt="Avatar"
              width={"60px"}
              height={"60px"}
            />
            🖋️
          </Link>
          <span id="bienvenido" className="navbar-text">
            Bienvenid@: {user.username}
          </span>
          <NavLink className="navbar-link" onClick={handleLogout}>
            Cerrar sesión
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default AuthUser;
