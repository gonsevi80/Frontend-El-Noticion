import PropTypes from "prop-types";

const DeleteNewsConfirm = ({ onConfirm, onCancel }) => {
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
      <h2>¿Estás seguro de que quieres eliminar esta noticia?</h2>
      <br />
      <button onClick={onConfirm}>Eliminar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

DeleteNewsConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteNewsConfirm;
