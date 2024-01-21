import { useParams } from "react-router-dom";
import useNews from "../hooks/useNews";

const NewsDetail = () => {
  const { NewsId } = useParams();

  const { News, error } = useNews(NewsId);

  const { VITE_API_URL } = import.meta.env;

  return News ? (
    <div>
      <h3>Details of news {News.title}</h3>
      {news.photos.length ? (
        News.photos.map((photo) => {
          return (
            <div key={News.id}>
              <img src={`${VITE_API_URL}/uploads/${photo.name}`} alt="photo" />
            </div>
          );
        })
      ) : (
        <p>The news doesn't have a photo</p>
      )}
      <p>News: {News.news}</p>
      <span>{News.votes} | </span>
      <span>Data: {new Date(News.createdAt).toLocaleDateString()}</span>
      {error ? <p>{error}</p> : ""}
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default NewsDetail;
