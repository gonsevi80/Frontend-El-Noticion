import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import modifyUserService from "../service/modifyUserService";

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
      updateUser({ username: data.get("username"), email: data.get("email") });

      // Navega a la página principal
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormData}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
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
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Modificar</button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};

export default FormUserEdit;
