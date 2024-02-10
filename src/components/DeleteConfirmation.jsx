const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div>
      <p className="estas-seguro">
        ¿Estás seguro de que quieres borrar la noticia?
      </p>
      <div className="bot-contenedor-estas">
        <button className="boton" onClick={onConfirm}>
          Confirmar
        </button>
        <button className="boton" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
