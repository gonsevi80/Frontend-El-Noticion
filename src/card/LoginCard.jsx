// LoginCard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormLogin from "../components/FormLogin.jsx";
import "../styles/LoginCard.css";
import RegisterCard from "./RegisterCard.jsx";

const LoginCard = ({ onClose, onSwitchToRegister }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);

  const handleClose = () => {
    setFormSubmitted(true);
    onClose();
  };

  const handleRegisterClick = () => {
    setRegisterCardVisibility(true);
    onSwitchToRegister(); // Llama a la función para cambiar a la tarjeta de registro
  };

  return (
    <div className="login-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <FormLogin onClose={handleClose} />
      <p className="regis">
        ¿No tienes cuenta?{" "}
        <Link to="#" onClick={handleRegisterClick}>
          Regístrate
        </Link>
      </p>
      {isRegisterCardVisible && (
        <RegisterCard onClose={() => setRegisterCardVisibility(false)} />
      )}
    </div>
  );
};

export default LoginCard;
