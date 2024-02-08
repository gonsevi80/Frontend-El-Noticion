import { useEffect, useState } from "react";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Importar los estilos CSS

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