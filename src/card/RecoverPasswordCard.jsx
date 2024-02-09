import { useEffect, useState } from "react";
import ChangeRecoverCard from "./ChangeRecoverCard"
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Asegúrate de que la ruta sea correcta

const RecoverPasswordCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isChangeRecoverCardVisible, setChangeRecoverCardVisibility] =
    useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setChangeRecoverCardVisibility(true);
   };



  console.log("Renderizado componente RecoverPasswordCard");

  return (
    <div className="recover-password-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      {!isFormSubmitted ? (
      <form onSubmit={handleSubmit}>
        <RecoverPasswordPage onClose={handleClose} />
      </form>
      ) : null}

{isChangeRecoverCardVisible && (
  <ChangeRecoverCard onClose={() => setChangeRecoverCardVisibility(false)} />
)}

    </div>
  );
};

export default RecoverPasswordCard;
