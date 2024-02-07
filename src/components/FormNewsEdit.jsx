import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import modifyNewsService from "../service/modifyNewsService";
import useNewsById from "../hooks/useNewsById";

const FormNewsEdit = ({ newsId }) => {
  const { token } = useContext(AuthContext);
  const [news, setNews] = useState({});
  const [category, setCategory] = useState("");
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

      setCategory(fetchedNews.category);
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

      const formdata = new FormData(e.target);
      const data = Object.fromEntries(formdata.entries());
      await modifyNewsService(newsId, data, token);

      // Cambia la siguiente línea para redirigir a la página de detalles de la noticia
      navigate(`/news`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {fetchError && <p>{fetchError}</p>}
      {news && (
        <form onSubmit={handleFormData}>
          <div>
            <label htmlFor="category">Categorías</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Música">Música</option>
              <option value="Deportes">Deportes</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Actualidad">Actualidad</option>
              <option value="Tecnologia">Tecnología</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Politica-interior">Política interior</option>
              <option value="Politica-exterior">Política exterior</option>
              <option value="Peliculas">Películas</option>
              <option value="Opinion">Opinión</option>
              <option value="Cultura">Cultura</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
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

          <button type="submit">Modificar</button>

          <Link to={`/news/${newsId}`}>
            <button>Volver a la noticia</button>
          </Link>
          {Array.isArray(news.photos) && news.photos.length > 0 ? (
            // Mapea las fotos de la noticia
            news.photos.map((photo) => (
              <div key={photo.id}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${photo.name}`}
                  alt="photo"
                />
              </div>
            ))
          ) : (
            <p>La noticia no tiene fotos</p>
          )}
        </form>
      )}
    </div>
  );
};

export default FormNewsEdit;
