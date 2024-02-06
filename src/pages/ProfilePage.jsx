import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider"; // Importa el contexto
import userIcon from "../assets/plumaymas.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import modifyUserAvatarService from "../service/modifyUserAvatarService";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup";
import deleteUserService from "../service/deleteUserService";

const ProfilePage = () => {
  const { user, token, logout, updateUser } = useContext(AuthContext); // Desestructura el proveedor
  const { VITE_API_URL } = import.meta.env;
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("avatar", avatar);
    try {
      await modifyUserAvatarService({ data, token });

      // Actualiza la información del usuario después de modificar el avatar
      updateUser({ ...user, avatar: URL.createObjectURL(avatar) });

      logout();
      navigate("/");
    } catch (error) {
      console.error("Error al modificar el avatar:", error);
    }
  };

  const handleDelete = async (usernameConfirmation) => {
    if (usernameConfirmation === user.username) {
      try {
        await deleteUserService(token);
        logout(); // Cierra la sesión del usuario
        navigate("/"); // Redirige al usuario a la página de inicio
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    } else {
      alert("El nombre de usuario no coincide.");
    }
  };

  return (
    <div>
      <h3>Perfil de usuario: {user?.username}</h3>
      <h4>Email: {user?.email}</h4>
      <h4>Biografía: {user?.biography}</h4>
      <h4>Aficiones: {user?.hobbies}</h4>
      <img
        src={user?.avatar ? `${VITE_API_URL}/uploads/${user.avatar}` : userIcon}
        alt="Imagen de perfil"
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
      <p>Miembro desde: {new Date(user?.createdAt).toLocaleDateString()}</p>
      <Link to="/users/profile/modify">
        <p>Modificar perfil</p>
      </Link>
      <button onClick={() => setShowDeletePopup(true)}>Eliminar Cuenta</button>
      {showDeletePopup && (
        <DeleteConfirmationPopup
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
      <Outlet />
    </div>
  );
};

export default ProfilePage;
