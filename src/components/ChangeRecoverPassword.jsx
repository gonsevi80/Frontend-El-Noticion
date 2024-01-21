import { useState } from "react";
import changeRecoverPasswordService from "../service/changeRecoverPasswordService";
import { useNavigate } from "react-router-dom";

const ChangeRecoverPassword = () => {

    const [email, setEmail] = useState('');
    const [regCode, setRegCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newPassword !== confirmNewPass){
            setError('Las contaseñas son distintas');
            return;
        }

        try {

            const data = new FormData(e.target);

            const json = await changeRecoverPasswordService(data);

            navigate('/login');        

        } catch (error) {
            setError(error.message);
        }
    }
    
    return (
        <div>
            <div>
                <p>Hemos enviado a tu email el código de recuperacion</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) =>  setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Código de Recuperación</label>
                    <input
                        type="text"
                        name="recoverPassCode"
                        value={regCode}
                        onChange={(e) =>  setRegCode(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ingresa tu nueva contraseña</label>
                    <input
                        type="text"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) =>  setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Repite tu nueva contraseña</label>
                    <input
                        type="text"
                        name="newPasswordRepeat"
                        value={confirmNewPass}
                        onChange={(e) =>  setConfirmNewPass(e.target.value)}
                    />
                </div>
                <button>Confirmar</button>
                {error ? <p>{error}</p> : null}
            </form>            
        </div>
    );
}

export default ChangeRecoverPassword;
