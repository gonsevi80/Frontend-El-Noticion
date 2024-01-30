import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormLogin from "../components/FormLogin.jsx";
import "../styles/LoginCard.css";
import RegisterCard from "./RegisterCard.jsx";

const LoginCard = ({ onClose }) => {
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSwitchToRegister = () => {
    setRegisterCardVisibility(true);
  };

  const handleLoginSuccess = () => {
    onClose();
  };

  return (
    <div className="login-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      {!isRegisterCardVisible && (
        <FormLogin
          onClose={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {isRegisterCardVisible && (
        <RegisterCard onClose={() => setRegisterCardVisibility(false)} />
      )}
      {!isRegisterCardVisible && (
        <p className="regis">
          ¿No tienes cuenta?{" "}
          <Link to="#" onClick={handleSwitchToRegister}>
            Regístrate
          </Link>
        </p>
      )}
    </div>
  );
};

export default LoginCard;
