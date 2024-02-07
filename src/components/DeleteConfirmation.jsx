import React from "react";

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div>
      <p>¿Estás seguro de que quieres borrar la noticia?</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default DeleteConfirmation;
