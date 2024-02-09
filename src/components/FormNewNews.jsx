import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import newNewsService from "../service/newNewsService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/NewNews-NewsEdit.css";
import AnadirPhotoService from "../service/AandirPHotoService";

const FormNewNews = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [prevImage, setPrevImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);

      // eslint-disable-next-line no-unused-vars
      const newNews = await newNewsService({ data, token });
      console.log(newNews.news.id);
      console.log("files:", e.target.photo.files);

      if (e.target.photo.files.length) {
        await AnadirPhotoService(newNews.news.id, data, token);
      }

      navigate("/news");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="form-news" onSubmit={handleSubmit}>
      <div>
        <label>Categoría</label>
        <select className="desplegable" name="category">
          <option value="" disabled>
            ..Selecciona Categoría..
          </option>
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
        <label>Titular</label>
        <input className="titular" type="text" name="headline" />
      </div>
      <div>
        <label>Entradilla</label>
        <textarea className="entradilla" type="text" name="entrance" />
      </div>
      <div>
        <label>Contenido de la noticia</label>
        <textarea
          className="contenido"
          type="text"
          name="paragraphs"
          style={{ textIndent: "0" }} // Agrega esta línea para establecer textIndent
        />
      </div>
      <div>
        <label>Imagen</label>
        <input
          className="foto-nueva-noticia"
          type="file"
          name="photo"
          accept="image/*"
          onChange={(e) => setPrevImage(e.target.files[0])}
        />
      </div>
      <div>
        {prevImage ? (
          <img
            src={URL.createObjectURL(prevImage)}
            alt="photo"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        ) : null}
      </div>
      <div className="bot-contenedor">
        <input className="boton" type="submit" value="Enviar" />
        {error ? <p>{error}</p> : null}
        <Link to="/">
          <input className="boton" type="text" value="Volver" />
        </Link>
      </div>
    </form>
  );
};

export default FormNewNews;
