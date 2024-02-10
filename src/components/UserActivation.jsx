// Importamos las dependencias necesarias.
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import validateUserService from "../service/validateUserService"; // Asegúrate de que la ruta sea correcta
import "../styles/Spinner.css"; // Importa los estilos del spinner

const UserActivation = () => {
  const { registrationCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateUser = async () => {
      try {
        await validateUserService(registrationCode);
        setMessage(
          "Cuenta activada con éxito. ¡Bienvenido a tu espacio de publicaciones!."
        );
        setLoading(false);
        // Navega al inicio después de mostrar el mensaje por un breve tiempo.
        setTimeout(() => navigate("/users/login"), 4000);
      } catch (error) {
        setMessage(`Error al activar la cuenta: ${error.message}`);
        setLoading(false);
      }
    };

    activateUser();
  }, [registrationCode, navigate]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return <div>{message}</div>;
};

export default UserActivation;
