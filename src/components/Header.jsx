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
            <NavLink to={"/users/login"}>Login</NavLink>
            {"  |  "}
            <NavLink to={"/users/register"}>Register</NavLink>
            {"  |  "}
          </>
        ) : (
          <>
            <NavLink to={"/news"}>New News</NavLink>
            {"  |  "}
            <NavLink to={"/News/search"}>Search</NavLink>
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
