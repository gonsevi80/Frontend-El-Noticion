import { createContext, useState, useEffect } from "react";
import getDataUserLoggedService from "../service/getDataUserLoggedService";
import { PropTypes } from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getDataUserLogged = async () => {
      try {
        const data = await getDataUserLoggedService({ token });
        setUser(data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    if (token) {
      getDataUserLogged();
    }
  }, [token]);

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
