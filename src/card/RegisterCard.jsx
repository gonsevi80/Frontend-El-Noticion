// RegisterCard.jsx
import React from "react";
import FormRegister from "../components/FormRegister.jsx";
import "../styles/RegisterCard.css";

const RegisterCard = ({ onClose }) => {
  return (
    <div className="register-card">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <FormRegister />
      <p>¿Ya tienes cuenta?{" "}
        <link to="/user/login" className={styles.loginLink}> 
        Iniciar sesión
        </link>
      </p>
    </div>
  );
};

export default RegisterCard;
