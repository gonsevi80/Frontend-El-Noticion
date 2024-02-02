import { useParams } from "react-router-dom";
import useNews from "../hooks/useNewsById";
import { Link } from "react-router-dom";

const NewsDetail = () => {
  const { newsId } = useParams(); // Corrige el nombre del parámetro
  const { news, error } = useNews(newsId);

  const { VITE_API_URL } = import.meta.env;

  return news ? (
    <div>
      <h3>{news.headline}</h3>
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

      <h3>{news.category}</h3>

      <h2>{news.headline}</h2>

      <p>Entradilla: {news.entrance}</p>

      <p>Contenido de la noticia: {news.paragraphs} </p>
      <p>Votos: {news.votes}</p>
      <span>
        Fecha de creación: {new Date(news.createdAt).toLocaleDateString()}
      </span>
      {error && <p>{error}</p>}

      <Link to={`/news`}>
        <button>Volver a Noticias</button>
      </Link>
      <Link to={`/news/${newsId}/edit`}>
        <button>Editar noticia</button>
      </Link>
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default NewsDetail;
