import { useState, useEffect } from "react";
import fetchApi from "../service/fetchApi";
import { Link } from "react-router-dom";

const News = () => {
  const { VITE_API_URL } = import.meta.env;
  const [news, setNews] = useState([]);

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
              <p>Titular: {item.headline}</p>
              <p>Entrada: {item.entrance}</p>
              <p>Propietario: {item.owner}</p>
              <p>Fecha de creación: {item.createdAt}</p>
              {/* Agrega más propiedades según sea necesario */}

              <Link to={`/news/${item.id}`}>Ver detalles</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default News;
