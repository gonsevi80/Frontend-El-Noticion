import { useState, useEffect, useContext } from "react";
import fetchApi from "../service/fetchApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const News = () => {
  const { VITE_API_URL } = import.meta.env;
  const [news, setNews] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApi(`${VITE_API_URL}/news`);

        setNews(data.data.news);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };

    fetchData();
  }, [VITE_API_URL]);

  return (
    <>
      <h2>Noticias</h2>
      <ul>
        {Array.isArray(news) &&
          news.map((item) => (
            <li key={item.id}>
              {/* Titulo */}
              <p>{item.headline}</p>

              {/* Entradilla */}
              <p>{item.entrance}</p>

              {/* Propietario */}
              <p>Subido por:{item.owner}</p>

              <p>Owner id: {item.userId}</p>

              <p>Fecha de creación: {item.createdAt}</p>

              <p>Logueado: {user?.id}</p>

              <p style={{ color: "red" }}>
                {user?.id === item.userId && "ES EL CREADOR"}
              </p>

              <Link to={`/news/${item.id}`}>Ver detalles</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default News;
