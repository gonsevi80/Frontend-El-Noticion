// LoginCard.jsx
import React, { useState, useEffect } from "react";
import FormLogin from "../components/FormLogin.jsx";
import "../styles/LoginCard.css";

const LoginCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      onClose();
    }
  }, [isFormSubmitted, onClose]);

  const handleClose = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="login-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <FormLogin />
      <p>
        ¿No tienes cuenta? <span onClick={handleClose}>Registrate</span>
      </p>
    </div>
  );
};

export default LoginCard;
