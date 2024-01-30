import React, { useState } from "react";
import registerUserService from "../service/resgisterUserService"; 
import { Link } from "react-router-dom";

const FormRegister = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [respuesta, setRespuesta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUserService({
        username,
        email,
        password,
      });
      setRespuesta(response);
      onSwitchToLogin();
      onClose(); // Cerrar la tarjeta de registro después de un registro exitoso
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        <h2 className="Titulo">Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de usuario:</label>
            <input
              className="recuadro"
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className="recuadro"
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              className="recuadro"
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="bot-ini" type="submit" value="Registrarme" />
          </div>
        </form>
        {respuesta.status === "ok" && <p>{respuesta.message}</p>}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default FormRegister;
