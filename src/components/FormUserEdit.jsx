import AuthContextProvider from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import modifyUserService from "../service/modifyUserService";

const FormUserEdit = () => {
  const { user, token } = useContext(AuthContextProvider);

  const [username, setUsername] = useState(user.username); // Corregido aquí

  const [email, setEmail] = useState(user.email); // Corregido aquí

  const [error, setError] = useState(""); // Corregido aquí

  const navigate = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);

      await modifyUserService(data, token);

      navigate("/users/avatar");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormData}>
        <div>
          <label htmlFor="">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Corregido aquí
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Corregido aquí
          />
        </div>
        <button>Modificar</button>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
};

export default FormUserEdit;
