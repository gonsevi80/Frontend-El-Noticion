import AuthUser from "./AuthUser";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import styles from "/src/components_css/header.module.css";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="styles.left-links">
          <NavLink to={"/home"} className="nav-link-home">
            Inicio
          </NavLink>
          {!user && (
            <NavLink to={"/news"} className="nav-link">
              Nueva noticia
            </NavLink>
          )}
        </div>
        <div className="styles.right-links">
          {!user ? (
            <>
              <NavLink to={"/users/login"} className="nav-link">
                Iniciar sesión
              </NavLink>
              <NavLink to={"/users/register"} className="nav-link">
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <div className="search-container">
                <input type="text" placeholder="Buscar..." />
                <button type="button">🔍</button>
              </div>
            </>
          )}
        </div>
      </nav>
      <div>
        <AuthUser />
      </div>
    </>
  );
};

export default Header;
