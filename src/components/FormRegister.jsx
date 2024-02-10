import { useState } from "react";
import registerUserService from "../service/resgisterUserService.js"; // Asegúrate de que la ruta sea correcta
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginRegisterRecover.css";

const FormRegister = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Estado para manejar el mensaje temporal

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
      // Suponiendo que tu respuesta tenga una propiedad 'status' que indique éxito
      if (response.status === "ok") {
        setMessage(
          "El cuervo ha sido enviado. Revisa tu correo para activar la cuenta."
        ); // Mensaje temporal
        setTimeout(() => {
          setMessage(""); // Limpiar mensaje
          onSwitchToLogin(); // Cambiar al formulario de inicio de sesión
          onClose(); // Cerrar la tarjeta de registro
        }, 5000); // Espera 3 segundos antes de ejecutar las acciones
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

      {/* <div className="regis">
          ¿No tienes cuenta? <Link to="/users/register">Regístrate</Link>
        </div>
 */}
    </form>
  );
};

export default FormRegister;
