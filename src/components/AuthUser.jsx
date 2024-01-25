import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import userIcon from "../assets/userIcon.jpg";

const AuthUser = () => {
  const { user, logout } = useContext(AuthContext);

  const { VITE_API_URL } = import.meta.env;

  return (
    <div>
      {user ? (
        <div>
          <span className="bienvenido">Bienvenid@: {user.email} </span>
          <Link to={`/users/${user.userId}`}>
            <img
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
          <button className="cerrarsesion" onClick={() => logout()}>Cerrar sesión</button>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AuthUser;
