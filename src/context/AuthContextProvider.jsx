import { createContext, useState, useEffect } from "react";
import getDataUserLoggedService from "../service/getDataUserLoggedService";

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

    getDataUserLogged();
  }, [token]);

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
