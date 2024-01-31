import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import newNewsService from "../service/newNewsService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormNewNews = () => {
  const { token } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [prevImage, setPrevImage] = useState(null);
  const [selectCategory, setSelectCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const response = await fetch();
    const data = await response.json();
    setCategories(data);
  } catch (error) {
    console.log("Error al obtener las categorias", error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      data.append('category', selectCategory);
      

      // eslint-disable-next-line no-unused-vars
      const newNews = await newNewsService({ data, token });

      navigate("/news/:newsId");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Categoría</label>
        <select
          name="category"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}>
          <option value="categoria">Música</option>
          <option value="categoria">Deportes</option>
          <option value="categoria">Entretenimiento</option>
          <option value="categoria">Actualidad</option>
          <option value="categoria">?</option>
        </select>
      </div>
      <div>
        <label>Titular</label>
        <input type="text" name="headline" />
      </div>
      <div>
        <label>Entradilla</label>
        <input type="text" name="entrance" />
      </div>
      <div>
        <label>Contenido de la noticia</label>
        <input type="text" name="paragraphs" />
      </div>
      <div>
        <label>Imagen</label>
        <input
          type="file"
          name="photo"
          accept="photo/*"
          onChange={(e) => setPrevImage(e.target.files[0])}
        />
      </div>
      <div>
        {prevImage ? (
          <img src={URL.createObjectURL(prevImage)} alt="photo" />
        ) : null}
      </div>
      <input type="submit" value="Enviar" />
      {error ? <p>{error}</p> : null}
      <Link to="/">
        <button>volver</button>
      </Link>
    </form>
  );
};

export default FormNewNews;
