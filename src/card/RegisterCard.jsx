// // RegisterCard.jsx
import React from "react";
import FormRegister from "../components/FormRegister.jsx";
import { Link } from "react-router-dom";
import styles from "../styles/RegisterCard.module.css";

const RegisterCard = ({ onClose }) => {
   return (
     <div className={styles['register-card']}>
       <button className="close-button" onClick={onClose}>
         X
       </button>
       <FormRegister />
       {/* <p>
         ¿Ya tienes cuenta?{" "}
         <span onClick={onClose}>Iniciar sesión</span>

      </p> */}
    
    </div>
   );
 };

export default RegisterCard;
