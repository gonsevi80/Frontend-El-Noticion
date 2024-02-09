import { useEffect, useState } from "react";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Asegúrate de que la ruta sea correcta
import ChangeRecoverCard from "./ChangeRecoverCard";

const RecoverPasswordCard = ({ onClose, onSubmit, ChangeRecoverCard}) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isChangeRecoverCard, setChangeRecoverCard] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
   e.preventDefault();
   setFormSubmitted(true);
   setChangeFormVisible(true);
  
  
  //  onSubmit();
  };



  return (
    <div className="recover-password-card">
      {isFormSubmitted ? (
        <ChangeRecoverCard onClose={handleClose} />
      ) : (
        <>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <RecoverPasswordPage onSubmit={handleSubmit} onClose={handleClose} />
        </>
      )}
    </div>
  );
};

export default RecoverPasswordCard;
