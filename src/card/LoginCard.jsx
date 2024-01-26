// LoginCard.jsx
import React from "react";
import FormLogin from "../components/FormLogin.jsx";
import "../styles/LoginCard.css"

const LoginCard = ({onClose}) => {
  return (
    <div className="login-card">
        <button className="close-button" onClick={onClose}>
            X
        </button>
      <FormLogin />
    </div>
  );
};

export default LoginCard;
