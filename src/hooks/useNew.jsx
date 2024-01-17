import { useState, useEffect } from "react";
import getNewByIdService from "../service/getNewByIdService";

const useNew = (NewId) => {
  const [New, setNew] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewById = async () => {
      console.log("New");
      try {
        const New = await getNewByIdService(NewId);

        setNew(New.data);
      } catch (error) {
        setError(error);
      }
    };

    getNewById();
  }, [NewId]);

  return { New, error };
};

export default useNew;
