import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import userIcon from '../assets/userIcon.jpg';

const AuthUser = () => {

    const {user, logout} = useContext(AuthContext);

    const { VITE_API_URL } = import.meta.env;

    return (
        <div>
            {
                user ? (
                    <div>
                        <span>Logueado como: {user.email} </span>
                        <Link to={'/user/profile'}>
                            <img
                                src={ user.avatar ?
                                            `${VITE_API_URL}/uploads/${user.avatar}`
                                            :
                                            userIcon
                                    }
                                alt="imagen"
                                width={'50px'}
                                height={'50px'}
                            />
                        </Link>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                ):(
                    <p>No hay ningun usuario conectado</p>
                )
            }
        </div>
    );
}

export default AuthUser;
