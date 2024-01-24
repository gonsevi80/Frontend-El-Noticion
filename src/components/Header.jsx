import AuthUser from "./AuthUser";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import "/src/components_css/header.module.css";

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
              <NavLink to={"/users/login"} className="nav-link">
                Iniciar sesión
              </NavLink>
              <NavLink to={"/users/register"} className="nav-link">
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/news"} className="nav-link hidden">
                New News
              </NavLink>
              <div className="search-bar">
                <i className="fa fa-search"></i>
                <NavLink to={"/News/search"}>Search</NavLink>
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
