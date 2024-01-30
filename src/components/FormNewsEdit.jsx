import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import modifyNewsService from "../service/ModifyService";
import useNewsById from "../hooks/useNewById";

const FormNewsEdit = ({ newsId }) => {
  const { token } = useContext(AuthContext);
  const [news, setNews] = useState({});
  const [headline, setHeadline] = useState("");
  const [entrance, setEntrance] = useState("");
  const [paragraphs, setParagraphs] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { news: fetchedNews, error: fetchError } = useNewsById(newsId);

  useEffect(() => {
    if (fetchedNews) {
      setNews(fetchedNews);
      setHeadline(fetchedNews.headline);
      setEntrance(fetchedNews.entrance);
      setParagraphs(fetchedNews.paragraphs);
      setLoading(false);
    }
  }, [fetchedNews]);

  const handleFormData = async (e) => {
    e.preventDefault();

    try {
      if (!headline || !entrance || !paragraphs) {
        setError("Todos los campos son obligatorios");
        return;
      }

      const data = new FormData(e.target);
      await modifyNewsService(newsId, data, token);

      // Cambia la siguiente línea para redirigir a la página de detalles de la noticia
      navigate(`/news/${newsId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {fetchError && <p>{fetchError}</p>}
      {news && (
        <form onSubmit={handleFormData} method="PUT">
          <div>
            <label htmlFor="headline">Titulo</label>
            <input
              type="text"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="entrance">Entrada</label>
            <input
              type="text"
              name="entrance"
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="paragraphs">Contenido noticia</label>
            <input
              type="text"
              name="paragraphs"
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
            />
          </div>

          <Link to={`/news/${newsId}`}>
            <button>Modificar</button>
          </Link>
          <Link to={`/news/${newsId}`}>
            <button>Volver a la noticia</button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default FormNewsEdit;
