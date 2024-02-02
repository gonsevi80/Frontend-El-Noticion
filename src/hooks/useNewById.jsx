import { useState, useEffect } from "react";
import getNewsByIdService from "../service/getNewsByIdService";

const useNews = (NewsId) => {
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewsById = async () => {
      console.log("News");
      try {
        const data = await getNewsByIdService(NewsId);
        console.log(data);
        setNews(data.data.news);
      } catch (error) {
        setError(error);
      }
    };

    getNewsById();
  }, [NewsId]);

  return { news, error };
};

export default useNews;
