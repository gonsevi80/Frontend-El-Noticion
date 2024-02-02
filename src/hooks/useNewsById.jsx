import { useState, useEffect } from "react";
import getNewsByIdService from "../service/getNewsByIdService";

const useNewsById = (newsId) => {

  const [news, setNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewsById = async () => {

      try {
        const data = await getNewsByIdService(newsId);
        setNews(data.data.news);
      } catch (error) {
        setError(error);
      }
    };

    getNewsById();

  }, [newsId]);


  return { news, error };
};

export default useNewsById;
