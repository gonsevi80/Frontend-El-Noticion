import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useParams, Link, useNavigate } from "react-router-dom";
import useNewsById from "../hooks/useNewsById";
import deleteNewsService from "../service/deleteNewsService";
import "../styles/NewsDetail.css";
import "../styles/Spinner.css";
import defaultImage from "../assets/image/olis.jpg";
import DeleteConfirmation from "./DeleteConfirmation";

const NewsDetail = () => {
  const { newsId } = useParams();
  const { news, error, isLoading } = useNewsById(newsId);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Verifica si el usuario actual es el creador de la noticia
    const usuarioActual = user ? user.username : null;
    if (news && usuarioActual === news.username) {
      setMostrarBotones(true);
    } else {
      setMostrarBotones(false);
    }
  }, [news, user]);

  const handleDeleteNews = async () => {
    try {
      await deleteNewsService(newsId, token);
      setMessage("Esta noticia se perderá en el infinito de la nada...");
      // Agrega un breve retardo antes de redirigir
      setTimeout(() => navigate("/news"), 2000);
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      setMessage("Error al eliminar la noticia");
    }
  };

  // Muestra el spinner mientras la noticia está cargando
  if (!news && !error && isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="news-detail">
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h3 className="cat-noti">{news.category}</h3>
          {Array.isArray(news.photos) && news.photos.length > 0 ? (
            news.photos.map((photo) => (
              <div className="foto" key={photo.id}>
                <img
                  src={`${VITE_API_URL}/uploads/${photo.name}`}
                  alt="photo"
                />
              </div>
            ))
          ) : (
            <div>
              <img
                className="photoDetail"
                src={defaultImage}
                alt="No hay foto disponible"
              />
            </div>
          )}
          {showConfirmation && (
            <DeleteConfirmation
              onCancel={() => setShowConfirmation(false)}
              onConfirm={handleDeleteNews}
            />
          )}
          <h3 className="headline">{news.headline}</h3>
          <p className="entradillaN">{news.entrance}</p>
          <p className="contenidoN">{news.paragraphs}</p>
          <span className="creado">
            {" "}
            {new Date(news.createdAt).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {message && <p>{message}</p>}
          <div className="bot-contenedorN">
            {mostrarBotones && (
              <button
                className="boton"
                onClick={() => setShowConfirmation(true)}
              >
                Eliminar Noticia
              </button>
            )}
            <Link to={`/news`}>
              <button className="boton">Volver a Noticias</button>
            </Link>
            {mostrarBotones && (
              <Link to={`/news/update/${newsId}`}>
                <button className="boton">Editar noticia</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetail;
