import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useSearch } from "../context/SearchContext.jsx";
import AuthUser from "./AuthUser";
import styles from "../styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const { updateSearchTerm } = useSearch();
  const { user } = useContext(AuthContext);
  const [bannerImage, setBannerImage] = useState(
    "src/assets/imagen/banner_periodico.jpeg"
  );

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
        <NavLink to="/" className={styles.navLink}>
          Inicio
        </NavLink>

        {user && (
          <NavLink to="/news/new-news" className={styles.navLink}>
            Nueva noticia
          </NavLink>
        )}

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Aqui, si buscas... encontrarás... a lo mejor;)"
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
                onClick={() => navigate("/users/login")}
                className={styles.buttonLink}
              >
                Iniciar sesión
              </button>

              <button
                onClick={() => navigate("/users/register")}
                className={styles.buttonLink}
              >
                Registrate
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Header;
