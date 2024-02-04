import { useState } from "react";
import { Link } from "react-router-dom";
import FormLogin from "../components/FormLogin.jsx";
import "../styles/LoginCard.css";
import RegisterCard from "./RegisterCard.jsx";
import RecoverPasswordCard from "./RecoverPasswordCard.jsx";

const LoginCard = ({ onClose }) => {
  const [isRegisterCardVisible, setRegisterCardVisibility] = useState(false);
  const [isRecoverPasswordCardVisible, setRecoverPasswordCardVisibility] =
    useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSwitchToRegister = () => {
    setRegisterCardVisibility(true);
  };

  const handleSwitchToRecoverPassword = () => {
    console.log("Switching to Recover Password");
    setRecoverPasswordCardVisibility(true);
  };

  const handleLoginSuccess = () => {
    onClose();
  };

  return (
    <div className="login-card">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      {!isRegisterCardVisible && !isRecoverPasswordCardVisible && (
        <FormLogin
          onClose={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
          onSwitchToRecoverPassword={handleSwitchToRecoverPassword}
        />
      )}
      {isRegisterCardVisible && (
        <RegisterCard onClose={() => setRegisterCardVisibility(false)} />
      )}

      {isRecoverPasswordCardVisible && (
        <RecoverPasswordCard
          onClose={() => setRecoverPasswordCardVisibility(false)}
        />
      )}

      {!isRegisterCardVisible && !isRecoverPasswordCardVisible && (
        <div>
          <p className="recup-contra">
            <Link to="#" onClick={handleSwitchToRecoverPassword}>
              Recuperar contraseña
            </Link>
          </p>

          <p className="regis">
            ¿No tienes cuenta?{" "}
            <Link to="#" onClick={handleSwitchToRegister}>
              Regístrate
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginCard;
