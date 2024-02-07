import { useParams } from "react-router-dom";
import useNewsById from "../hooks/useNewsById";
import { Link } from "react-router-dom";
import "../styles/News.css"
const NewsDetail = () => {
  const { newsId } = useParams(); // Corrige el nombre del parámetro
  const { news, error } = useNewsById(newsId);

  const { VITE_API_URL } = import.meta.env;

  return news ? (
    <div className="news-detail">
      <h3 className="titulo-noticia">{news.headline}</h3>
      {Array.isArray(news.newsPhotos) && news.newsPhotos.length > 0 ? (
        // Mapea las fotos de la noticia
        news.newsPhotos.map((photo) => (
          <div key={photo.id}>
            <img src={`${VITE_API_URL}/uploads/${photo.name}`} alt="photo" />
          </div>
        ))
      ) : (
        <p className="con-foto">La noticia no tiene fotos</p>
      )}

      <h3 className="cat-noti">{news.category}</h3>

      <h3 className="headline">{news.headline}</h3>

      <p className="entradillaN">Entradilla: {news.entrance}</p>

      <p className="contenidoN">Contenido de la noticia: {news.paragraphs} </p>
     
      <span className="creado">Creado el: {new Date(news.createdAt).toLocaleDateString()}</span>
      {error && <p>{error}</p>}

      <div className="bot-contenedorN">
        <Link to={`/news`}>
          <button className="bot-volverN">Volver a Noticias</button>
        </Link>
        <Link to={`/news/update/${newsId}`}>
          <button className="bot-edit-not">Editar noticia</button>
        </Link>
      </div>
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default NewsDetail;
