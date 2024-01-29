// AuthUser.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import userIcon from "../assets/userIcon.jpg";
import defaultAvatar from "../assets/default/plumaymas.jpg"; // Ruta de la foto predeterminada

const AuthUser = () => {
  const { user, logout } = useContext(AuthContext);
  const { VITE_API_URL } = import.meta.env;

  return (
    <div className="user-container">
      {user ? (
        <div className="user-info">
          <Link to={`/users/${user.userId}`}>
            <img
            className={user.avatar ? "user-avatar" : "default-avatar"}
              src={
                user.avatar
                  ? `${VITE_API_URL}/uploads/${user.avatar}`
                  : defaultAvatar
              }
              alt="imagen"
              width={"50px"}
              height={"50px"}
            />
          </Link>
          <span className="bienvenido">Bienvenid@: {user.email}</span>
          <button className="cerrarsesion" onClick={() => logout()}>
            Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AuthUser;
