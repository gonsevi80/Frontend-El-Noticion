import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider"; // Importa el contexto
import userIcon from "../assets/plumaymas.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import modifyUserAvatarService from "../service/modifyUserAvatarService";

const ProfilePage = () => {
  const { user, token, logout, updateUser } = useContext(AuthContext); // Desestructura el proveedor
  const { VITE_API_URL } = import.meta.env;

  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("avatar", avatar);

    await modifyUserAvatarService({ data, token });

    // Actualiza la información del usuario después de modificar el avatar
    updateUser({ avatar: data });

    logout();

    navigate("/login");
  };

  
  return (
    <div>
      <h3>Perfil de usuario {user.username}</h3>
      <h4>Email: {user.email}</h4>
      <h4>Biografía: {user.biography}</h4>
      <h4>Aficiones: {user.hobbies}</h4>
      <img
        src={user.avatar ? `${VITE_API_URL}/uploads/${user.avatar}` : userIcon}
        alt="imagen"
        width={"250px"}
        height={"250px"}
      />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" name="avatar" onChange={handleChange} />
        </div>
        <input type="submit" value="Modificar Avatar" />
      </form>
      <p>Miembro desde: {new Date(user.createdAt).toLocaleDateString()}</p>
      <Link to={"/users/profile/modify"}>
        <p>Modificar...</p>
      </Link>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
