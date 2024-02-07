import { useParams } from "react-router-dom";

import useNewsById from "../hooks/useNewsById";

import { Link } from "react-router-dom";

const NewsDetail = () => {
  const { newsId } = useParams(); // Corrige el nombre del parámetro
  const { news, error } = useNewsById(newsId);

  const { VITE_API_URL } = import.meta.env;

  return news ? (
    <div>
      <h3>{news.headline}</h3>
      {Array.isArray(news.photos) && news.photos.length > 0 ? (
        // Mapea las fotos de la noticia
        news.photos.map((photo) => (
          <div key={photo.id}>
            <img src={`${VITE_API_URL}/uploads/${photo.name}`} alt="photo" />
          </div>
        ))
      ) : (
        <p>La noticia no tiene fotos</p>
      )}

      <h3>{news.category}</h3>

      <h3>{news.headline}</h3>

      <p>Entradilla: {news.entrance}</p>

      <p>Contenido de la noticia: {news.paragraphs} </p>
      <p>Votos: {news.votes}</p>
      <span>
        Fecha de creación: {new Date(news.createdAt).toLocaleDateString()}
      </span>
      {error && <p>{error}</p>}

      {/* Botones de voto */}
      {/* {!voted && ( */}
        <div>
          <button onClick={() => handleVote(true)}>👍</button>
          <button onClick={() => handleVote(false)}>👎</button>
        </div>
      {/* )} */}

      <Link to={`/news`}>
        <button>Volver a Noticias</button>
      </Link>
      <Link to={`/news/update/${newsId}`}>
        <button>Editar noticia</button>
      </Link>
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default NewsDetail;
