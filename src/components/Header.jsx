import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useSearch } from "../context/SearchContext.jsx";
import AuthUser from "./AuthUser";
import styles from "../styles/Header.module.css";
import LoginCard from "../card/LoginCard";
import RegisterCard from "../card/RegisterCard";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { updateSearchTerm } = useSearch();
  const [isLoginCardVisible, setLoginCardVisibility] = useState(false);
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);

  // Actualiza el código para manejar la visibilidad de las tarjetas de login y registro
  const handleToggleLoginCard = () => {
    setLoginCardVisibility(!isLoginCardVisible);
    setRegisterCardVisibility(false);
  };

  const handleToggleRegisterCard = () => {
    setRegisterCardVisibility(!isRegisterCardVisible);
    setLoginCardVisibility(false);
  };

  return (
    <>
      <nav className={styles.navBar}>
        <div>
          <NavLink to="/" className={styles.navLink}>
            Inicio
          </NavLink>
          {user && (
            <NavLink to="/news/new-news" className={styles.navLink}>
              Nueva noticia
            </NavLink>
          )}
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="si buscas... encontrarás... a lo mejor;)"
            onChange={(e) => updateSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.rightLinks}>
          <div className={styles.userContainer}>
            <AuthUser />
          </div>

          {!user ? (
            <>
              <button
                onClick={handleToggleLoginCard}
                className={styles.buttonLink}
              >
                Iniciar sesión
              </button>

              <button
                onClick={handleToggleRegisterCard}
                className={styles.buttonLink}
              >
                Registrate
              </button>
            </>
          ) : null}
        </div>
      </nav>

      {isLoginCardVisible && (
        <LoginCard onClose={() => setLoginCardVisibility(false)} />
      )}
      {isRegisterCardVisible && (
        <RegisterCard onClose={() => setRegisterCardVisibility(false)} />
      )}
    </>
  );
};

export default Header;
