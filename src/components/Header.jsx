import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import AuthUser from "./AuthUser";
import styles from "/src/styles/header.module.css";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [bannerImage, setBannerImage] = useState(
    "/src/assets/imagen/banner_periodico.jpeg"
  );

  useEffect(() => {
    const handleResize = () => {
      const newBannerImage =
        window.innerWidth < 768
          ? "/src/assets/imagen/banner_mobile.jpeg"
          : "/src/assets/imagen/banner_periodico.jpeg";
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

        <div className={styles.rightLinks}>
          {!user ? (
            <>
              <NavLink to="/users/login" className={styles.navLink}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/users/register" className={styles.navLink}>
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <div className={styles.searchContainer}>
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
