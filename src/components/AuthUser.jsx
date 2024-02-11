import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../assets/plumaymas.jpg";
import styles from "../styles/Header.module.css";

const AuthUser = () => {
  const { user, logout } = useContext(AuthContext);
  const { VITE_API_URL } = import.meta.env;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <div>
          <Link className="botProfile" to={`/users/profile`}>
            <div className="avatarNav">
              <div className="plumaIcono"></div>
              <div className="fotoPerfil">
                <img
                  src={
                    user.avatar
                      ? `${VITE_API_URL}/uploads/${user.avatar}`
                      : userIcon
                  }
                  alt="Avatar"
                  width={"60px"}
                  height={"60px"}
                />
              </div>
            </div>
          </Link>
          <span id="bienvenido">Bienvenid@: {user.username}</span>
          <NavLink className={styles.buttonLink} onClick={handleLogout}>
            Cerrar sesión
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default AuthUser;
