import AuthUser from "./AuthUser";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        {"  |  "}
        {!user ? (
          <>
            <NavLink to={"/users/login"}>Iniciar Sesion</NavLink>
            {"  |  "}
            <NavLink to={"/users/register"}>Resgistrarse</NavLink>
            {"  |  "}
          </>
        ) : (
          <>
            <NavLink to={"/news"}>Noticias</NavLink>
            {"  |  "}
            <NavLink to={"/news/search"}>Buscar</NavLink>
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
