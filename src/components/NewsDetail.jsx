import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useNewsById from "../hooks/useNewsById";
import deleteNewsService from "../service/deleteNewsService";
import "../styles/NewsDetail.css";
import "../styles/Spinner.css"; // Asegúrate de que este import está correcto según la ubicación de tu Spinner.css

import DeleteConfirmation from "./DeleteConfirmation";

const NewsDetail = () => {
  const { newsId } = useParams();
  const { news, error, isLoading } = useNewsById(newsId); // Asumiendo que useNewsById maneja un estado de isLoading
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDeleteNews = async () => {
    try {
      await deleteNewsService(newsId, token);
      setMessage("Esta noticia se perderá en el infinito de la nada...");
      // Agrega un breve retardo antes de redirigir para permitir que el mensaje sea leído
      setTimeout(() => navigate("/news"), 2000);
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      setMessage("Error al eliminar la noticia");
    }
  };

  // Muestra el spinner mientras la noticia está cargando
  if (!news && !error && isLoading) {
    // Asegúrate de que isLoading sea implementado y manejado correctamente en useNewsById
    return <div className="spinner"></div>; // Usa el estilo del spinner definido en Spinner.css
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
              <div key={photo.id}>
                <img
                  className="foto"
                  src={`${VITE_API_URL}/uploads/${photo.name}`}
                  alt="photo"
                />
              </div>
            ))
          ) : (
            <p>No hay fotos disponibles.</p>
          )}
          <h3 className="headline">{news.headline}</h3>
          <p className="entradillaN">{news.entrance}</p>
          <p className="contenidoN">{news.paragraphs}</p>
          <span className="creado">
            Creado el: {new Date(news.createdAt).toLocaleDateString()}
          </span>
          {message && <p>{message}</p>}
          <div className="bot-contenedorN">
            <button className="boton" onClick={() => setShowConfirmation(true)}>
              Eliminar Noticia
            </button>
            <Link to={`/news`}>
              <button className="boton">Volver a Noticias</button>
            </Link>
            <Link to={`/news/update/${newsId}`}>
              <button className="boton">Editar noticia</button>
            </Link>
          </div>
          {showConfirmation && (
            <DeleteConfirmation
              onCancel={() => setShowConfirmation(false)}
              onConfirm={handleDeleteNews}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsDetail;
