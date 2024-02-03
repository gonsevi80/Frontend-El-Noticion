// RecoverPasswordCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Importar los estilos CSS

const RecoverPasswordCard = ({ onClose }) => {
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = () => {
    setPasswordChanged();
  };
  // const handleSwitchToRecoverPasswordPage = () => {
  //   setRecoverPasswordPageVisibility(true);
  // };

  // const handleSwitchToChangeRecoverPassword = () => {
  //   setChangeRecoverPasswordVisibility(true);
  // };

  return (
    <div className="recover-password-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <RecoverPasswordPage passwordChanged={passwordChanged} />
      {passwordChanged && (
        <div>
          <p>Hemos enviado a tu email el código de recuperación</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>{/* ... (tu formulario existente) */}</form>
    </div>
  );
};

export default RecoverPasswordCard;