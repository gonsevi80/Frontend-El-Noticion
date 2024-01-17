import { useState, useEffect } from "react";
import fetchApi from "../service/fetchApi";

const useNews = () => {
  const { VITE_API_URL } = import.meta.env;

  const [News, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      const data = await fetchApi(`${VITE_API_URL}/News`);
      setNews(data.data);
    };

    getAllNews();
  }, []);

  return News;
};

export default useNews;
