import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import AuthUser from "./AuthUser";
import styles from "../styles/Header.module.css";
import LoginCard from "../card/LoginCard";
import RegisterCard from "../card/RegisterCard";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [bannerImage, setBannerImage] = useState(
    "src/assets/imagen/banner_periodico.jpeg"
  );
  const [isLoginCardVisible, setLoginCardVisibility] = useState(false);
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);

  const toggleLoginCard = () => {
    setLoginCardVisibility(!isLoginCardVisible);
    setRegisterCardVisibility(false);
  };
  const toggleRegisterCard = () => {
    setRegisterCardVisibility(!isRegisterCardVisible);
    setLoginCardVisibility(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const newBannerImage =
        window.innerWidth < 768
          ? "src/assets/imagen/banner_maquina_escribir.jpeg"
          : "src/assets/imagen/banner_periodico.jpeg";
      setBannerImage(newBannerImage);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav>
        <div className={styles.leftLinks}>
          {!user ? (
            <NavLink to="/home" className={styles.navLinkHome}>
              Inicio
            </NavLink>
          ) : (
            <NavLink to="/news" className={styles.navLink}>
              Nueva noticia
            </NavLink>
          )}
        </div>

        <div className={styles.searchContainer}>
          <input type="text" placeholder="Buscar..." />
          <button type="button">🔍</button>
        </div>

        <div className={styles.rightLinks}>
          <div className={styles.userContainer}>
            <AuthUser />
          </div>

          {!user ? (
            <>
              <button onClick={toggleLoginCard} className={styles.navLink}>
                Iniciar sesión
              </button>
              <button onClick={toggleRegisterCard} className={styles.navLink}>
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
