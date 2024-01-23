import { useState, useEffect } from "react";
import getNewsByIdService from "../service/getNewsByIdService";

const useNews = (NewsId) => {
  const [News, setNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewsById = async () => {
      console.log("News");
      try {
        const New = await getNewsByIdService(NewsId);

        setNews(New.data);
      } catch (error) {
        setError(error);
      }
    };

    getNewsById();
  }, [NewsId]);

  return { News, error };
};

export default useNews;