import { useState, useEffect } from "react";
import getNewsByIdService from "../service/getNewsByIdService";

const useNewsById = (newsId) => {
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getNewsById = async () => {
      try {
        const data = await getNewsByIdService(newsId);
        setNews(data.data.news);
        setError("");
      } catch (error) {
        setError("No se pudo cargar la noticia");
      } finally {
        setLoading(false);
      }
    };

    getNewsById();
  }, [newsId]);

  return { news, error, isLoading };
};

export default useNewsById;
