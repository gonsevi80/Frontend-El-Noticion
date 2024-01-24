import AuthUser from "./AuthUser";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
<<<<<<< HEAD
import styles from "/src/components_css/header.module.css";
=======
import "/src/styles/header.css";
>>>>>>> bdd2e08 (volviendo a un commit anterior)

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="styles.left-links">
          <NavLink to={"/home"} className="nav-link-home">
            Inicio
          </NavLink>
<<<<<<< HEAD
          {!user && (
            <NavLink to={"/news"} className="nav-link">
              Nueva noticia
            </NavLink>
          )}
=======
>>>>>>> bdd2e08 (volviendo a un commit anterior)
        </div>
        <div className="styles.right-links">
          {!user ? (
            <>
              <NavLink to={"/users/login"} className="nav-link">
                Iniciar sesión
              </NavLink>
<<<<<<< HEAD
              <NavLink to={"/users/register"} className="nav-link">
                Registrarse
=======

              <NavLink to={"/register"} className="nav-link">
                Registrarte
>>>>>>> bdd2e08 (volviendo a un commit anterior)
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
