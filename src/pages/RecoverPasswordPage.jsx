import { useState } from "react";
import setRecoverPasswordService from "../service/setRecoverPasswordService";
import { useNavigate } from "react-router-dom";

const RecoverPasswordPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setRecoverPasswordService(email, username);
      navigate("/users/password"); // Redirige al usuario después del proceso
      if (onClose) onClose(); // Cierra el modal o la tarjeta si se proporcionó la función onClose
    } catch (error) {
      setError(error.message); // Maneja errores, por ejemplo, si el usuario o email no existen
    }
  };

  return (
    <div>
      <h3 className="Titulo">Recuperar contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario: </label>
          <input
            className="recuadro"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email: </label>
          <input
            className="recuadro"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="bot-ini">
          Enviar
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default RecoverPasswordPage;
