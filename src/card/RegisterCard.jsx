// // RegisterCard.jsx
import React, { useState } from "react";
import FormRegister from "../components/FormRegister.jsx";
import { Link } from "react-router-dom";
import styles from "../styles/RegisterCard.module.css";
// import LoginCard from "./LoginCard";

const RegisterCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  // const handleFormSubmit = async () => {
    const handleClose = () => {
    setFormSubmitted(true);
    onClose();
    };
  
   return (
     <div className={styles['register-card']}>
       <button className="close-button" onClick={handleClose}>
         X
       </button>
       <FormRegister onClose={handleClose} />
       <p>
         ¿Ya tienes cuenta?{" "}
         <span onClick={handleClose}>Iniciar sesión</span>

      </p>
    </div>
   );
 };

export default RegisterCard;
