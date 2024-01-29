// // RegisterCard.jsx
import React, { useState } from "react";
import FormRegister from "../components/FormRegister.jsx";
import { Link } from "react-router-dom";
import styles from "../styles/RegisterCard.module.css";
import LoginCard from "./LoginCard";

const RegisterCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isLoginCardVisible, setLoginCardVisibility] = useState(false);

  const handleClose = () => {
    setFormSubmitted(true);
    onClose();
  };

  const handleLoginClick = () => {
    setLoginCardVisibility(true);
  };

  return (
    <div className={styles["register-card"]}>
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <FormRegister onClose={handleClose} />
      <p>
        ¿Ya tienes cuenta?{" "}
        <Link to="#" onClick={handleLoginClick}>
          Iniciar sesión
        </Link>
      </p>
      {isLoginCardVisible && (
        <LoginCard onClose={() => setLoginCardVisibility(false)} />
      )}
    </div>
  );
};

export default RegisterCard;
