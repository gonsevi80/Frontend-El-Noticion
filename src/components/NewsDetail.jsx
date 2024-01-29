import { useParams } from "react-router-dom";
import useNews from "../hooks/useNewById";
import { Link } from "react-router-dom";

const NewsDetail = () => {
  const { newsId } = useParams(); // Corrige el nombre del parámetro
  const { news, error } = useNews(newsId);

  const { VITE_API_URL } = import.meta.env;

  return news ? (
    <div>
      <h3>Detalles de la noticia {news.headline}</h3>
      {Array.isArray(news.newsPhotos) && news.newsPhotos.length > 0 ? (
        // Mapea las fotos de la noticia
        news.newsPhotos.map((photo) => (
          <div key={photo.id}>
            <img src={`${VITE_API_URL}/uploads/${photo.name}`} alt="photo" />
          </div>
        ))
      ) : (
        <p>La noticia no tiene fotos</p>
      )}
      <p>Contenido de la noticia: </p>
      <p>Titular: {news.headline}</p>
      <p>Entrada: {news.entrance}</p>
      <p>Votos: {news.votes}</p>
      <span>
        Fecha de creación: {new Date(news.createdAt).toLocaleDateString()}
      </span>
      {error && <p>{error}</p>}

      <Link to="/news">
        <button>Volver a Noticias</button>
      </Link>
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default NewsDetail;
