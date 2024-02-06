import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import validateUserService from "../service/validateUserService"; // Asegúrate de que la ruta sea correcta

const UserActivation = () => {
  const { registrationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      try {
        await validateUserService(registrationCode);
        alert("Cuenta activada con éxito. Bienvenido a la plataforma.");
        navigate("/"); // Redirige al usuario a la página principal
      } catch (error) {
        alert(`Error al activar la cuenta: ${error.message}`);
        console.error("Error activando el usuario:", error);
      }
    };

    console.log("useEffect");
    activateUser();
  }, [registrationCode, navigate]);

  return <div>Activando tu cuenta, por favor espera...</div>;
};

export default UserActivation;
