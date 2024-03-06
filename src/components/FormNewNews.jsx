import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import newNewsService from "../service/newNewsService";
import AnadirPhotoService from "../service/AnadirPhotoService";
import "../styles/NewNews-NewsEdit.css";
import iconoMas from "../assets/image/camara.png";
import defaultPhoto from "../assets/image/olis.jpg";

const MAX_NUM_PHOTOS = 3;

const FormNewNews = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [entrance, setEntrance] = useState("");
  const [paragraphs, setParagraphs] = useState("");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !headline || !entrance || !paragraphs) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const data = new FormData();
      data.append("category", category);
      data.append("headline", headline);
      data.append("entrance", entrance);
      data.append("paragraphs", paragraphs);

      if (photos.length === 0) {
        const response = await fetch(defaultPhoto);
        const blob = await response.blob();
        const file = new File([blob], "defaultPhoto.jpg", {
          type: "image/jpeg",
        });
        data.append("photo", file);
      } else {
        photos.forEach((photo) => {
          data.append("photo", photo);
        });
      }

      const newNewsResponse = await newNewsService({ data, token });
      const newsId = newNewsResponse.news.id;

      if (photos.length > 1) {
        for (let i = 0; i < photos.length; i++) {
          const photoFormData = new FormData();
          photoFormData.append("photo", photos[i]);
          await AnadirPhotoService(newsId, photoFormData, token);
        }
      }

      navigate("/news");
    } catch (error) {
      setError(`Error al crear la noticia: ${error.message}`);
    }
  };

  const handlePhotoChange = (event) => {
    const selectedPhotos = event.target.files;
    if (photos.length + selectedPhotos.length <= MAX_NUM_PHOTOS) {
      setPhotos((prevPhotos) => [...prevPhotos, ...selectedPhotos]);
    } else {
      setError(`No puedes añadir más de ${MAX_NUM_PHOTOS} fotos.`);
    }
  };

  return (
    <form className="form-news" onSubmit={handleSubmit}>
      <div>
        <label>Categoría</label>
        <select
          className="desplegable"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            ..Selecciona Categoría..
          </option>
          <option value="Música">Música</option>
          <option value="Deportes">Deportes</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Actualidad">Actualidad</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Política interior">Política interior</option>
          <option value="Política exterior">Política exterior</option>
          <option value="Películas">Películas</option>
          <option value="Opinión">Opinión</option>
          <option value="Cultura">Cultura</option>
          <option value="Otra">Otra</option>
        </select>
      </div>
      <div>
        <label>Titular</label>
        <input
          className="titular"
          type="text"
          name="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>
      <div>
        <label>Entradilla</label>
        <textarea
          className="entradilla"
          name="entrance"
          value={entrance}
          onChange={(e) => setEntrance(e.target.value)}
        />
      </div>
      <div>
        <label>Contenido de la noticia</label>
        <textarea
          className="contenido"
          name="paragraphs"
          value={paragraphs}
          onChange={(e) => setParagraphs(e.target.value)}
        />
      </div>
      <div className="agregarFotos">
        <label htmlFor="fileInput" className="iconoMas">
          <img src={iconoMas} alt="Agregar más" />
          <p>{`${photos.length}/${MAX_NUM_PHOTOS}`}</p>
        </label>
        <input
          id="fileInput"
          className="foto-nueva-noticia"
          type="file"
          name="photo"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          style={{ display: "none" }}
        />
      </div>
      <div>
        {photos.length > 0 && (
          <div className="preview-fotos">
            {Array.from(photos).map((photo, index) => (
              <div key={index} className="preview-foto-container">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`preview ${index}`}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bot-contenedor">
        <button className="boton" type="submit">
          Enviar
        </button>
        <button className="boton" type="button" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default FormNewNews;
