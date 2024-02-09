import { useState, useEffect } from "react";
import getNewsByIdService from "../service/getNewsByIdService";

const useNewsById = (newsId) => {
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true); // Agregado para manejar la carga

  useEffect(() => {
    const getNewsById = async () => {
      try {
        const data = await getNewsByIdService(newsId);
        setNews(data.data.news);
        setError(""); // Asegúrate de limpiar cualquier error previo
      } catch (error) {
        setError("No se pudo cargar la noticia");
      } finally {
        setLoading(false); // Asegura que el estado de carga se actualice correctamente
      }
    };

    getNewsById();
  }, [newsId]);

  return { news, error, isLoading }; // Incluimos isLoading en el valor retornado
};

export default useNewsById;
