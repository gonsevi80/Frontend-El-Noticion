import { useState } from "react";
import { useNavigate } from "react-router-dom";
import setRecoverPasswordService from "../service/setRecoverPasswordService";
import "../styles/LoginRegisterRecover.css";

const RecoverForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setRecoverPasswordService(email, username);
      navigate("/users/password");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form className="form-regis-recup" onSubmit={handleSubmit}>
        <h3 className="titulo-">Recuperar contraseña</h3>
        <div className="contenedor-">
          <div>
            <label className="letra-regis-recup">Nombre de usuario: </label>
            <input
              className="recuadro"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="letra-regis-recup">Email: </label>
            <input
              className="recuadro"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="contenedor-bot">
          <button type="submit" className="boton-">
            Enviar
          </button>
          <button
            type="button"
            className="boton-volver"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default RecoverForm;
