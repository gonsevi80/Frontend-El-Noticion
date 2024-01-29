// LoginCard.jsx
import React, { useState } from "react";
import FormLogin from "../components/FormLogin.jsx";
import "../styles/LoginCard.css"

const LoginCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const handleClose = () => {
    setFormSubmitted(true);
    onClose();
    };

  return (
    <div className="login-card">
        <button className="close-button" onClick={handleClose}>
            X
        </button>
      <FormLogin />
      <p>
        ¿No tienes cuenta?{" "}
        <span onClick={handleClose}>Registrate</span>
      </p>
    </div>
  );
};

export default LoginCard;
