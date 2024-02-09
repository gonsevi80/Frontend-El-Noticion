import { useEffect, useState } from "react";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Asegúrate de que la ruta sea correcta

const RecoverPasswordCard = ({ onClose, onSubmit }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);


  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    onSubmit();
   };



  console.log("Renderizado componente RecoverPasswordCard");

  return (
    <div className="recover-password-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <RecoverPasswordPage onClose={handleClose} />
    </div>
  );
};

export default RecoverPasswordCard;
