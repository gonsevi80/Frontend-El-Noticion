import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useNewsById from "../hooks/useNewsById";
import deleteNewsService from "../service/deleteNewsService";
import "../styles/NewsDetail.css";

import DeleteConfirmation from "./DeleteConfirmation";

const NewsDetail = () => {
  const { newsId } = useParams();
  const { news, error } = useNewsById(newsId);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { VITE_API_URL } = import.meta.env;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDeleteNews = async () => {
    try {
      await deleteNewsService(newsId, token);
      alert("Noticia eliminada correctamente");
      navigate("/news");
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      alert("Error al eliminar la noticia");
    }
  };

  return news ? (
    <div className="news-detail">
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
        <p></p>
      )}

      <h3 className="headline">{news.headline}</h3>

      <p className="entradillaN"> {news.entrance}</p>

      <p className="contenidoN"> {news.paragraphs} </p>

      <span className="creado">
        Creado el: {new Date(news.createdAt).toLocaleDateString()}
      </span>
      {error && <p>{error}</p>}

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
