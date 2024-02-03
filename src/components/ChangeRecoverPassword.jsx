import { useState } from "react";
import changeRecoverPasswordService from "../service/changeRecoverPasswordService";
import { useNavigate } from "react-router-dom";

const ChangeRecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [regCode, setRegCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false); // Nuevo estado para el mensaje

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
      }, 2000); // Ejemplo: espera 2 segundos antes de redirigir a /login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <p>Hemos enviado a tu email el código de recuperación</p>
      </div>
      {passwordChanged && (
        <div style={{ color: "green" }}>Su contraseña está actualizada</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            className="recuadro"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Código de Recuperación</label>
          <input
            className="recuadro"
            type="text"
            name="recoverPassCode"
            value={regCode}
            onChange={(e) => setRegCode(e.target.value)}
          />
        </div>
        <div>
          <label>Ingresa tu nueva contraseña</label>
          <input
            className="recuadro"
            type="password"
            name="newPass"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div>
          <label>Repite tu nueva contraseña</label>
          <input
            className="recuadro"
            type="password"
            name="newPassRepeat"
            value={confirmNewPass}
            onChange={(e) => setConfirmNewPass(e.target.value)}
          />
        </div>
        <button className="bot-ini">Confirmar</button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};

export default ChangeRecoverPassword;
