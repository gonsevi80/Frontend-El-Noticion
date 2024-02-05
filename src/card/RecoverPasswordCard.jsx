// RecoverPasswordCard.jsx

import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Importar los estilos CSS

const RecoverPasswordCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);


  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

  setFormSubmitted(true);

   };



  console.log("Renderizado componente");

  return (
    <div className="recover-password-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit}>
          <RecoverPasswordPage />
        </form>
      ) : null}
    </div>
  );
};

export default RecoverPasswordCard;