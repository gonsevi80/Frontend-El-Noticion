import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import modifyUserService from "../service/modifyUserService";
import "../styles/UserEdit.css";

const FormUserEdit = () => {
  const { user, token, updateUser } = useContext(AuthContext);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      await modifyUserService(data, token);

      // Actualiza el usuario en el contexto
      updateUser({
        username: data.get("username"),
        email: data.get("email"),
        biography: data.get("biography"),
        hobbies: data.get("hobbies"),
      });

      // Navega a la página de perfil
      navigate("/users/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-user-edit" onSubmit={handleFormData}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            className="nombre-usuario"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="email-usuario"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="biography">Acerca de mí:</label>
          <textarea
            className="biografia"
            type="text"
            id="biography"
            name="biography"
            defaultValue={user.biography}
          />
        </div>
        <div>
          <label htmlFor="hobbies">Aficiones</label>
          <input
            className="aficiones"
            type="text"
            id="hobbies"
            name="hobbies"
            defaultValue={user.hobbies}
          />
        </div>
        <div className="bot-contenedorU">
          <button className="bot-modificar" type="submit">
            Modificar
          </button>
          {error ? <p>{error}</p> : null}

          <button
            className="bot-volverU"
            onClick={() => navigate("/users/profile")}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUserEdit;
