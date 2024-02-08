import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import "../styles/RecoverPasswordCard.css"; // Asegúrate de que la ruta sea correcta

const RecoverPasswordCard = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  console.log("Renderizado componente RecoverPasswordCard");

  return (
    <div className="recover-password-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <RecoverPasswordPage onClose={handleClose} />
    </div>
  );
};

export default RecoverPasswordCard;
