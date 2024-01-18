import { useContext, useState } from "react";
import { loginUserService } from "../service/loginUserService";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate, Link } from "react-router-dom";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rta = await loginUserService({ email, passwd });

      setToken(rta);

      navigate("/"); //redirigir en forma automática a una det ruta
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPasswd(e.target.value)}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          <Link to={"/user/recover-password"}>
            <p>Recuperar contraseña</p>
          </Link>
        </div>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
};

export default FormLogin;
