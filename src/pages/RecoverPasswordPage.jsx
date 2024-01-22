import { useState } from "react";
import setRecoverPasswordService from "../service/setRecoverPasswordService";
import { useNavigate } from "react-router-dom";

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await setRecoverPasswordService(email);

      navigate("/users/password/recover");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h3>Recuperar contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button>Enviar</button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};
export default RecoverPasswordPage;
