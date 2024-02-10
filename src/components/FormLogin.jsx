import { useContext, useState } from "react";
import { loginUserService } from "../service/loginUserService";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate, Link } from "react-router-dom";

const FormLogin = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await loginUserService({ email, password });
      setToken(respuesta);
      navigate("/users/news");
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h3 className="Titulo">Iniciar sesión</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email:</label>
          <input
            className="recuadro"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Contraseña:</label>
          <input
            className="recuadro"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Iniciar sesión</button>
        </div>
        {error ? <p>{error}</p> : null}
      </form>
      <div className="regis">
        ¿No tienes cuenta? <Link to="/users/register">Regístrate</Link>
      </div>

      <div className="recup-contra">
        <Link to={"/users/password/recover"}>
          <p>Recuperar contraseña</p>
        </Link>
      </div>
    </>
  );
};

export default FormLogin;
