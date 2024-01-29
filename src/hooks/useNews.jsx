import { useState, useEffect } from "react";
import fetchApi from "../service/fetchApi";

const useNews = () => {
  const { VITE_API_URL } = import.meta.env;

  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      const data = await fetchApi(`${VITE_API_URL}/news`);
      setNews(data.data);
    };

    getAllNews();
  }, [VITE_API_URL]);

  return news;
};

export default useNews;
