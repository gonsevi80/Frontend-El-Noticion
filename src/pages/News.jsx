import { useState, useEffect, useContext } from "react";
import fetchApi from "../service/fetchApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import styles from "../styles/News-entrance.module.css";

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
  <h4>Noticias</h4>;
  return (
    <div className="entrances">
      {Array.isArray(news) &&
        news.map((item) => (
          <div
            key={item.id}
            className="entrance-card"
            style={{
              transform: `rotate(${Math.floor(Math.random() * 11) - 5}deg)`,
            }}
          >
            {/* Categorías */}
            <p className="category-entrance">
              <b>{item.category}</b>
            </p>
            {/* Titulo */}
            <p>
              <b className="title-entrance">{item.headline}</b>
            </p>
            {/* Entradilla */}
            <p className="entrance">{item.entrance}</p>
            {/* Propietario */}
            <p className="owner">Autor:{item.owner}</p>
            {/*<p>Owner id: {item.userId}</p>*/}
            <p className="created">Fecha de creación: {item.createdAt}</p>
            {/*<p>Logueado: {user?.id}</p>*/}
            <p style={{ color: "red" }}>{user?.id === item.userId && <></>}</p>
            <Link to={`/news/${item.id}`} className="Read-more">
              Leer más
            </Link>
          </div>
        ))}
    </div>
  );
};
export default News;
