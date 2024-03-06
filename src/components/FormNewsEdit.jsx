import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import modifyNewsService from "../service/modifyNewsService";
import useNewsById from "../hooks/useNewsById";
import "../styles/NewNews-NewsEdit.css";
import deletePhotoService from "../service/deletePhotoService";
import AnadirPhotoService from "../service/AnadirPhotoService";
import iconoMas from "../assets/image/camara.png";
const MAX_NUM_PHOTOS = 3;
const FormNewsEdit = ({ newsId }) => {
  const { token } = useContext(AuthContext);
  const [news, setNews] = useState({});
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [entrance, setEntrance] = useState("");
  const [paragraphs, setParagraphs] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const { news: fetchedNews, error: fetchError } = useNewsById(newsId);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    // Comprobar si ya se alcanzó el límite de fotos
    if (news.photos.length >= MAX_NUM_PHOTOS) {
      setError("No se pueden agregar más de 3 fotos");
      return;
    }
    setPhoto(selectedPhoto);
    // Actualizar el estado de las fotos en news
    setNews((prevNews) => ({
      ...prevNews,
      photos: [...prevNews.photos, selectedPhoto],
    }));
  };

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

    // Limite campo titulo
    if (headline.length > 34) {
      setError("El título no puede contener más de 34 caracteres");
      return;
    }
    //Limite ampo entradilla
    if (entrance.length > 200) {
      setError("La entradilla no puede contener más de 200 caracteres");
      return;
    }

    if (!headline || !entrance || !paragraphs) {
      setError("Todos los campos son obligatorios, exceptuando las fotos");
      return;
    }

    try {
      const formData = new FormData(e.target);
      if (photo) {
        formData.set("photo", photo);
      }
      const data = Object.fromEntries(formData.entries());

      await modifyNewsService(newsId, data, token);

      if (photo) {
        await AnadirPhotoService(newsId, formData, token);
      }
      setSuccessMessage("¡La noticia se ha modificado exitosamente!");
      setTimeout(() => {
        navigate(`/news/${newsId}`);
      }, 1000); // Redirigir después de 2 segundo
    } catch (error) {
      setError(`Error al modificar la noticia: ${error.message}`);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deletePhotoService(photoId, newsId, token);
      const updatedPhotos = news.photos.filter((photo) => photo.id !== photoId);
      setNews((prevNews) => ({ ...prevNews, photos: updatedPhotos }));
      navigate(-1);
    } catch (error) {
      setError(`Error al eliminar la foto: ${error.message}`);
    }
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {fetchError && <p>{fetchError}</p>}
      {news && (
        <form className="form-news" onSubmit={handleFormData}>
          <div>
            <label htmlFor="category">Categorías</label>
            <select
              className="desplegable"
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
              className="titular"
              type="text"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="entrance">Entrada</label>
            <textarea
              className="entradilla"
              type="text"
              name="entrance"
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="paragraphs">Contenido noticia</label>
            <textarea
              className="contenido"
              type="text"
              name="paragraphs"
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
            />
          </div>

          <div className="agregarFotos">
            <label htmlFor="fileInput" className="iconoMas">
              <img src={iconoMas} alt="Icono más" />
              {news.photos && (
                <p>{`${news.photos.length}/${MAX_NUM_PHOTOS}`}</p>
              )}
            </label>

            <div className="inputfoto">
              <input
                id="fileInput"
                className="foto-nueva-noticia"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <div className="edit-message">
            {successMessage && <p>{successMessage}</p>}
          </div>

          <div className="bot-contenedor">
            <button className="bot-modifi" type="submit">
              Modificar
            </button>

            <Link to={`/news/${newsId}`}>
              <button className="bot-volver">Volver a la noticia</button>
            </Link>
          </div>

          {Array.isArray(news.photos) && news.photos.length > 0 && (
            <div className="previewPhoto">
              {news.photos.map((photo, index) => (
                <div key={photo.id} className="previewPhotocontainer">
                  {photo instanceof File ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`preview ${index}`}
                      style={{}}
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${
                        photo.name
                      }`}
                      alt={`preview ${index}`}
                      style={{}}
                    />
                  )}
                  <div className="DeleteCube">
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      style={{ cursor: "pointer" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Mensaje de error para validaciones de longitud */}
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default FormNewsEdit;
