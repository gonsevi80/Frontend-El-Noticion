import { useState, useEffect } from "react";
import fetchApi from "../service/fetchApi";

const useNews = () => {
  const { VITE_API_URL } = import.meta.env;

  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      try {
        const data = await fetchApi(`${VITE_API_URL}/news`);
        setNews(news.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getAllNews();
  }, [VITE_API_URL]);

  return news;
};

export default useNews;
