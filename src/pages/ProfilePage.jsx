import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider"; // Importa el contexto
import userIcon from "../assets/plumaymas.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import modifyUserAvatarService from "../service/modifyUserAvatarService";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup";
import deleteUserService from "../service/deleteUserService";
import styles from "../styles/ProfileCard.module.css";
const ProfilePage = () => {
  const { user, token, logout, updateUser } = useContext(AuthContext);
  const { VITE_API_URL } = import.meta.env;
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
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
      setMessage("El nombre de usuario no coincide.");
    }
  };

  return (
    <div className={styles.containerProfile}>
      <div className={styles.cardProfile}>
        <div className={styles.headProfile}>
          <img
            src={
              user?.avatar ? `${VITE_API_URL}/uploads/${user.avatar}` : userIcon
            }
            alt="Imagen de perfil"
            width={"250px"}
            height={"250px"}
          />
          <h3>Hola {user?.username}</h3>
          <h4> {user?.email}</h4>
        </div>
        <div className={styles.userInfo}>
          <h3>Acerca de mí:</h3>
          <h4 className={styles.bio}> {user?.biography}</h4>
          <h3>Aficiones:</h3>
          <h4> {user?.hobbies}</h4>
          <p className={styles.menbresiaProfile}>
            Miembro desde: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <br />
        <form onSubmit={handleSubmit} className={styles.botArchivo}>
          <div className={styles.footerProfile}>
            <input type="file" name="avatar" onChange={handleChange} />
            <input
              type="submit"
              value="click después de elegir Avatar"
              className={styles.botAvatar}
            />

            <Link to="/users/profile/modify" className={styles.botModificar}>
              <p>Ir a modificar perfil</p>
            </Link>

            <button
              onClick={() => setShowDeletePopup(true)}
              className={styles.botEliminar}
            >
              Eliminar Cuenta
            </button>
          </div>
          {message && <p>{message}</p>}
        </form>
        {showDeletePopup && (
          <DeleteConfirmationPopup
            onConfirm={handleDelete}
            onCancel={() => setShowDeletePopup(false)}
          />
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
