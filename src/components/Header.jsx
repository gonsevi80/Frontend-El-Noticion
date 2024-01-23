import AuthUser from "./AuthUser";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import "/src/components_css/header.css";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="left-links">
          <NavLink to={"/home"} className="nav-link-home">
            Inicio
          </NavLink>
          
        </div>
        <div className="right-links">
          {!user ? (
            <>
              <NavLink to={"/login"} className="nav-link">
                Iniciar sesión
              </NavLink>
              
              <NavLink to={"/register"} className="nav-link">
                Registrarte
              </NavLink>
              
            </>
          ) : (
            <>
              <NavLink to={"/News/new-News"} className="nav-link hidden">
                Nueva noticia
              </NavLink>
              {"  |  "}
              <div className="search-bar">
                <i className="fa fa-search"></i>
                <NavLink to={"/News/search"} className="nav-link hidden">
                  Buscar
                </NavLink>
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
