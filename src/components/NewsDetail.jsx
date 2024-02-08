import { useState } from "react";
import { useParams, Link, Link, useNavigate } from "react-router-dom";
import useNewsById from "../hooks/useNewsById";
import deleteNewsService from "../service/deleteNewsService"; // Importa el servicio de eliminación de noticias
import "../styles/NewsDetail.css"

import DeleteConfirmation from "./DeleteConfirmation"; // Importa el componente de confirmación

const NewsDetail = () => {
  const { newsId } = useParams();
  const { news, error } = useNewsById(newsId);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar la visibilidad del componente de confirmación
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDeleteNews = async () => {
    try {
      await deleteNewsService(newsId, token);
      alert("Noticia eliminada correctamente");
      navigate("/news"); // Redirige a la página de inicio después de eliminar la noticia
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      alert("Error al eliminar la noticia");
    }
  };

  return news ? (
    <div className="news-detail">
      {Array.isArray(news.photos) && news.photos.length > 0 ? (
        news.photos.map((photo) => (
          <div key={photo.id}>
            <img
              className="con-foto"
              src={`${VITE_API_URL}/uploads/${photo.name}`}
              alt="photo"
            />
          </div>
        ))
      ) : (
        <p></p>
      )}

      <h3 className="cat-noti">{news.category}</h3>

      <h3 className="headline">{news.headline}</h3>

      <p className="entradillaN"> {news.entrance}</p>

      <p className="contenidoN"> {news.paragraphs} </p>

      <span className="creado">
        Creado el: {new Date(news.createdAt).toLocaleDateString()}
      </span>
      {error && <p>{error}</p>}

      <div>
        <button onClick={() => setShowConfirmation(true)}>
          Eliminar Noticia
        </button>
      </div>
      <div className="bot-contenedorN">
        <Link to={`/news`}>
          <button className="bot-volverN">Volver a Noticias</button>
        </Link>
        <Link to={`/news/update/${newsId}`}>
          <button className="bot-edit-not">Editar noticia</button>
        </Link>
      </div>

      {/* Renderiza el componente de confirmación si showConfirmation es true */}
      {showConfirmation && (
        <DeleteConfirmation
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleDeleteNews}
        />
      )}
   
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default NewsDetail;
