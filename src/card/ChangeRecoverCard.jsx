import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "../styles/ChangeRecoverCard.css"; // Importar los estilos CSS
import ChangeRecoverPassword from "../components/ChangeRecoverPassword";

const ChangeRecoverCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);
  };


  return (
    <div className="change-recover-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit}>
          <ChangeRecoverPassword />
        </form>
      ) : null}
    </div>
  );
};

export default ChangeRecoverCard;