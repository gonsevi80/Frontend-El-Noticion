// components/DeleteConfirmationPopup.js
import { useState } from "react";
import PropTypes from "prop-types";

const DeleteConfirmationPopup = ({ onConfirm, onCancel }) => {
  const [username, setUsername] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <h2>¿Estás seguro de que quieres caer en el olvido?</h2>
      <input
        type="text"
        placeholder="Escribe tu nombre de usuario para confirmar"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <button onClick={() => onConfirm(username)}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

DeleteConfirmationPopup.propTypes = {
  onConfirm: PropTypes.func.isRequired, // Indica que onConfirm es una función y es requerida
  onCancel: PropTypes.func.isRequired, // Indica que onCancel es una función y es requerida
};

export default DeleteConfirmationPopup;
