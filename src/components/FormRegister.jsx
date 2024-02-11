import { useState } from "react";
import registerUserService from "../service/resgisterUserService.js"; // Asegúrate de que la ruta sea correcta
import { Link } from "react-router-dom";
import "../styles/LoginRegisterRecover.css";

const FormRegister = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setMessage(""); // Limpiar mensajes previos

    try {
      const response = await registerUserService({
        username,
        email,
        password,
      });

      if (response.status === "ok") {
        setMessage(
          "El cuervo ha sido enviado. Revisa las ordenes del pergamino sellado para activar tu cuenta."
        );
        setTimeout(() => {
          setMessage("");
          onSwitchToLogin();
          onClose();
        }, 5000);
      } else {
        setError("Error al registrar el usuario."); // Manejo de respuesta de error no esperada
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="form-regis-recup" onSubmit={handleSubmit}>
      <h3 className="titulo-">Regístrate</h3>
      <div className="contenedor-">
        <div>
          <label className="letra-regis-recup">Nombre de usuario:</label>
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
          <label className="letra-regis-recup">Email:</label>
          <input
            className="recuadro"
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="contenedor-">
          <label className="letra-regis-recup">Contraseña:</label>
          <input
            className="recuadro"
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="contenedor-bot">
        <button className="boton-">Registrarme</button>
      </div>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="regis">
        {" "}
        ¿Ya tienes cuenta? <Link to="/users/login">Inicia sesión</Link>
      </div>
    </form>
  );
};

export default FormRegister;
