import { useState, useEffect } from "react";
import fetchApi from "../service/fetchApi";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";

const News = () => {
  const { VITE_API_URL } = import.meta.env;

  const newsData = useNews();

  return (
    <>
      <h2>Noticias</h2>
      {/* Render condicional de un formulario */}
      {Array.isArray(useNews) &&
        newsData.map((news) => {
          return (
            <div key={news.id}>
              <p>Noticia: {news.entrance}</p>
              {news.photo.length ? (
                <img
                  src={`${VITE_API_URL}/uploads/${news.photos[0].name}`}
                  alt=""
                />
              ) : (
                "La noticia no contiene imágenes"
              )}
              <Link to={`/news/detail/${news.id}`}>
                <p>Más info...</p>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default News;
