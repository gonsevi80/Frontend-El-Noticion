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
            <NavLink to={"/login"}>Login</NavLink>
            {"  |  "}
            <NavLink to={"/register"}>Register</NavLink>
            {"  |  "}
          </>
        ) : (
          <>
            <NavLink to={"/News/new-News"}>New News</NavLink>
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
