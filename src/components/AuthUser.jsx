import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate

import userIcon from "../assets/plumaymas.jpg";

const AuthUser = () => {
  const { user, logout } = useContext(AuthContext);
  const { VITE_API_URL } = import.meta.env;
  const navigate = useNavigate(); // Obtén la función navigate

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige a la página de inicio al cerrar sesión
  };

  return (
    <div className="user-container">
      {user ? (
        <div className="user-info">
          <Link to={`/users/profile`}>
            <img
              className={"user-avatar"}
              src={
                user.avatar
                  ? `${VITE_API_URL}/uploads/${user.avatar}`
                  : userIcon
              }
              alt="imagen"
              width={"50px"}
              height={"50px"}
            />
          </Link>
          <span className="bienvenido">Bienvenid@: {user.username}</span>
          <button className="cerrarsesion" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AuthUser;
