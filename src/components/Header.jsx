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
  const [shouldCloseLoginCard, setShouldCloseLoginCard] = useState(false);

  const toggleLoginCard = () => {
    setLoginCardVisibility(!isLoginCardVisible);
    setRegisterCardVisibility(false);
    setShouldCloseLoginCard(false);
  };
  const toggleRegisterCard = () => {
    setRegisterCardVisibility(!isRegisterCardVisible);
    setLoginCardVisibility(false);
  };

  useEffect(() => {
    if (shouldCloseLoginCard && isLoginCardVisible) {
      setLoginCardVisibility(false);
    }
  }, [shouldCloseLoginCard, isLoginCardVisible]);

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
      <nav className={styles.navBar}>
        <div>
          {!user ? (
            <NavLink to="/" className={styles.navLink}>
              Inicio
            </NavLink>
          ) : (
            <NavLink to="/news/new-news" className={styles.navLink}>
              Nueva noticia
            </NavLink>
          )}
        </div>

        <div className={styles.searchContainer}>
          <input type="text" placeholder="Buscar..." />
          <NavLink type="button">🔍</NavLink>
        </div>

        <div className={styles.rightLinks}>
          <div className={styles.userContainer}>
            <AuthUser />
          </div>

          {!user ? (
            <>
              <NavLink onClick={toggleLoginCard} className={styles.navLink}>
                Iniciar sesión
              </NavLink>

              <NavLink onClick={toggleRegisterCard} className={styles.navLink}>
                Registrate
              </NavLink>
            </>
          ) : null}
        </div>
      </nav>
      {isLoginCardVisible && (
        <LoginCard onClose={() => setShouldCloseLoginCard(true)} />
      )}
      {isRegisterCardVisible && (
        <RegisterCard onClose={() => setRegisterCardVisibility(false)} />
      )}
    </>
  );
};

export default Header;
