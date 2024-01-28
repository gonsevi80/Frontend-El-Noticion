import React, { useState } from "react";
import resgisterUserService from "../service/resgisterUserService";
import { Link } from "react-router-dom";

const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [respuesta, setRespuesta] = useState({});
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resgisterUserService({
        username,
        email,
        password,
      });
      setRespuesta(response);
      // setIsFormSubmitted(true);
      onCLose();
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect(() => {
  //   if (isFormSubmitted) {
  //     onclose();
  //   }
  // }, [isFormSubmitted, onCLose]);


  return (
    <form onSubmit={handleSubmit}>

      <div>
        <h2>Registrate</h2>
        <label>Nombre de usuario</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" value="Enviar" />
      </div>
      {respuesta.status === "ok" && <p>{respuesta.message}</p>}
      {error && <p>{error}</p>}
      {/* <Link to="/users/login">Iniciar sesión</Link> */}
    </form>
  );
};

export default FormRegister;
