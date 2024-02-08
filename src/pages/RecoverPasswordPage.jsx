import { useState } from "react";
import setRecoverPasswordService from "../service/setRecoverPasswordService";
import { useNavigate } from "react-router-dom";

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");

  const [username, setUserName] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await setRecoverPasswordService(email);

      navigate("/users/password");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h3 className="Titulo">Recuperar contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            className="recuadro"
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email: </label>
          <input
            className="recuadro"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="bot-ini">
          Enviar
        </button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};
export default RecoverPasswordPage;
