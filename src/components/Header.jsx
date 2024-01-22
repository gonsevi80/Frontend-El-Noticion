import AuthUser from "./AuthUser";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav>
        <NavLink to={"/"}>Inicio</NavLink>
        {"  |  "}
        {!user ? (
          <>
            <NavLink to={"/login"}>Iniciar sesión</NavLink>
            {"  |  "}
            <NavLink to={"/register"}>Registrarte</NavLink>
            {"  |  "}
          </>
        ) : (
          <>
            <NavLink to={"/News/new-News"}>Nueva noticia</NavLink>
            {"  |  "}
            <NavLink to={"/News/search"}>Buscar</NavLink>
          </>
        )}
      </nav>
      <div>
        <AuthUser />
      </div>
    </>
  );
};

export default Header;
