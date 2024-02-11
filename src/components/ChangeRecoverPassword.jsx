import { useState } from "react";
import changeRecoverPasswordService from "../service/changeRecoverPasswordService";
import { useNavigate } from "react-router-dom";
import "../styles/ChangeRecover.css";

const ChangeRecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [regCode, setRegCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass !== confirmNewPass) {
      setError("Las contraseñas son distintas");
      return;
    }

    try {
      const data = new FormData(e.target);
      await changeRecoverPasswordService(data);

      // Actualizar el estado para mostrar el mensaje
      setPasswordChanged(true);

      // Navegar a la página de login después de un breve retraso
      setTimeout(() => {
        navigate("/users/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form className="form-c" onSubmit={handleSubmit}>
        <p className="codigo-cambio">
          Hemos enviado a tu email el código de recuperación
        </p>
        <h3 className="titulo-cambio">Cambia tu contraseña</h3>
        <div></div>
        <div className="contenedor-cambio">
          <div>
            <label className="letra-cambio">Email</label>
            <input
              className="recuadro-cambio"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="letra-cambio">Código de Recuperación</label>
            <input
              className="recuadro"
              type="text"
              name="recoverPassCode"
              value={regCode}
              onChange={(e) => setRegCode(e.target.value)}
            />
          </div>
          <div>
            <label className="letra-cambio">Ingresa tu nueva contraseña</label>
            <input
              className="recuadro"
              type="password"
              name="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div>
            <label className="letra-cambio">Repite tu nueva contraseña</label>
            <input
              className="recuadro"
              type="password"
              name="newPassRepeat"
              value={confirmNewPass}
              onChange={(e) => setConfirmNewPass(e.target.value)}
            />
          </div>
        </div>
        <div className="contenedor-bot-cambio">
          <button className="boton-cambio">Confirmar</button>
        </div>
        {error ? <p>{error}</p> : null}
        {passwordChanged && (
          <div className="contra-actualizada" style={{ color: "green" }}>
            Su contraseña está actualizada
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangeRecoverPassword;
