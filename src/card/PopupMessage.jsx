
import React from "react";
import "../styles/PopupMessage.css";

const PopupMessage = ({ onClose }) => {
  return (
    <div className="popup-message">
      <p>Hemos enviado a tu email el código de recuperación</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default PopupMessage;
