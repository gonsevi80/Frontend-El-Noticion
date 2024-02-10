import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useSearch } from "../context/SearchContext";
import fetchApi from "../service/fetchApi";
import styles from "../styles/News-entrance.module.css";
import useNewsById from "../hooks/useNewsById";

const News = () => {
  const { user } = useContext(AuthContext);
  const { searchTerm } = useSearch();
  const [news, setNews] = useState([]);
  const { VITE_API_URL } = import.meta.env;

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

  const filteredNews = searchTerm
    ? news.filter(
        (n) =>
          n.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.entrance.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : news;

  return (
    <div className={styles.entrancesContenedor}>
      {filteredNews.map((item) => (
        <div
          key={item.id}
          className={styles.entranceCard}
          style={{
            transform: `rotate(${Math.floor(Math.random() * 11) - 5}deg)`, // Aplica la rotación aquí
          }}
        >
          <div className={styles.icon}></div>
          <p className={styles.categoryEntrance}>
            <b>{item.category}</b>
          </p>
          <p>
            <b className={styles.titleEntrance}>{item.headline}</b>
          </p>
          <NewsDetailsWithImage newsId={item.id} />
          <p className={styles.entrance}>{item.entrance}</p>
          <p className={styles.owner}>Autor: {item.owner}</p>
          <p className={styles.created}>
            Fecha de creación: {new Date(item.createdAt).toLocaleDateString()}
          </p>
          {user?.id === item.userId && <p style={{ color: "red" }}></p>}
          <Link to={`/news/${item.id}`} className={styles.readMore}>
            Leer más
          </Link>
        </div>
      ))}
    </div>
  );
};

const NewsDetailsWithImage = ({ newsId }) => {
  const { VITE_API_URL } = import.meta.env;
  const { news, error } = useNewsById(newsId);
  return (
    <div>
      {news && (
        <div className="photoPreview">
          {Array.isArray(news.photos) && news.photos.length > 0 ? (
            news.photos.map((photo) => (
              <div key={photo.id}>
                <img
                  className="photoPreview"
                  src={`${VITE_API_URL}/uploads/${photo.name}`}
                  alt="photo"
                />
              </div>
            ))
          ) : (
            <p>No hay foto disponible</p>
          )}
        </div>
      )}
    </div>
  );
};
export default News;
