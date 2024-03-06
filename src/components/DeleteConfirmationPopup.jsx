import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/DeleteConfirmationPopup.module.css";

const DeleteConfirmationPopup = ({ onConfirm, onCancel }) => {
  const [username, setUsername] = useState("");

  return (
    <div className={styles.deleteConfirmation}>
      <h2>
        ¿Estás seguro de que quieres caer en el olvido sin llevarte las tus
        noticias contigo?
      </h2>
      <input
        type="text"
        placeholder="Escribe tu nombre de usuario para confirmar"
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <button className={styles.button} onClick={() => onConfirm(username)}>
        Confirmar
      </button>
      <button className={styles.button} onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
};

DeleteConfirmationPopup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationPopup;
