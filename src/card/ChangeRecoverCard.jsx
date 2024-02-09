import { useState } from "react";
import ChangeRecoverPassword from "../components/ChangeRecoverPassword";
import { is } from "protypes";
import "../styles/ChangeRecoverCard.css"; // Importar los estilos CSS

const ChangeRecoverCard = ({ onClose }) => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    setFormSubmitted(true);
    // onSubmit();
  };

  return (
    <div className="change-recover-card">
      {isFormSubmitted ? ( <p>hemos hecho esto</p>
      ) :( 
        <>
      <button className="close-button" onClick={handleClose}>
        X
      </button>
          <ChangeRecoverPassword onSubmitt={handleSubmit} onClose={handleClose} />
          </> 
          )}
    </div>
  );
};

export default ChangeRecoverCard;
