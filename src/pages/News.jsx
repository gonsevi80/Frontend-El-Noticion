import { useState, useEffect } from "react";
import fetchApi from "../service/fetchApi";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";

const news = () => {
  const { VITE_API_URL } = import.meta.env;

  const news = useNews();

  return (
    <>
      <h2>Noticias El Notición</h2>
      {
        /*render condicional de un formulario*/
        news &&
          news?.map((news) => {
            return (
              <div key={news.id}>
                <p>Noticia: {news.entrance}</p>
                {news.photo.length ? (
                  <img
                    src={`${VITE_API_URL}/uploads/${news.photos[0].name}`}
                    alt=""
                  />
                ) : (
                  "La noticia no contiene imagenes"
                )}
                <Link to={`/news/detail/${news.id}`}>
                  <p>Mas info...</p>
                </Link>
              </div>
            );
          })
      }
    </>
  );
};

export default news;
