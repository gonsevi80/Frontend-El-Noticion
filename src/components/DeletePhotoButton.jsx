const DeletePhotoButton = ({ onDelete }) => {
  return (
    <button type="button" onClick={onDelete} className="delete-photo-button">
      Eliminar{" "}
      <span role="img" aria-label="Papelera">
        🗑️
      </span>
    </button>
  );
};

export default DeletePhotoButton;
