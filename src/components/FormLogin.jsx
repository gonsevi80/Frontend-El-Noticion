import { useContext, useState } from "react";
import { loginUserService } from "../service/loginUserService";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginRegisterRecover.css";

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
      <form className="form-" onSubmit={handleSubmit}>
        <h3 className="titulo-">Iniciar sesión</h3>
        <div className="contenedor-">
          <div>
            <label className="letra-" htmlFor="">
              Email:
            </label>
            <input
              className="recuadro"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="contenedor-">
            <label className="letra-" htmlFor="">
              Contraseña:
            </label>
            <input
              className="recuadro"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="contenedor-bot">
          <button className="boton-">Iniciar sesión</button>
        </div>
        {error ? <p>{error}</p> : null}
        <div className="regis">
          ¿No tienes cuenta? <Link to="/users/register">Regístrate</Link>
        </div>

        <div className="recup-contra">
          <Link to={"/users/password/recover"}>
            <p>He olvidado mi contraseña</p>
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
