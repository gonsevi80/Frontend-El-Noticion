// RecoverPasswordCard.jsx

import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import PopupMessage from "./PopupMessage";
import "../styles/RecoverPasswordCard.css"; // Importar los estilos CSS

const RecoverPasswordCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);


  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

  setFormSubmitted(true);
  setPopupVisible(true);
  console.log("isPopVisible después de setPopupVisible(true):", isPopupVisible);

   };


  const handlePopupClose = () => {
  setPopupVisible(false);
  console.log("Popup cerrado");
  };

  console.log("Renderizado componente");
  console.log("Mostrar popup:", isPopupVisible);

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
      {isPopupVisible && <PopupMessage onClose={handleClose} />}
    </div>
  );
};

export default RecoverPasswordCard;