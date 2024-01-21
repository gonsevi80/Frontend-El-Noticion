import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import getNewsByEntrancelaceService from "../service/getNewsByEntranceService";
const Search = () => {
  const { VITE_API_URL } = import.meta.env;

  const [state, setState] = useState([]);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPlace = searchParams.get("entrance");

  const handleChange = (entrance) => {
    if (entrance) {
      setSearchParams({ entrance: entrance });
    } else {
      searchParams({});
    }
  };

  const handleClick = async () => {
    try {
      const News = await getNewsByEntranceService(currentEntrance);

      setState(News.data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <input
        type="text"
        name="entrance"
        placeholder="Ingrese la entrada...."
        value={currentEntrance || ""}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={handleClick}>🥄</button>
      {state.length ? <h4>Resultados para: {currentEntrance}</h4> : null}
      {state &&
        state?.map((News) => {
          return (
            <div key={News.id}>
              <div>
                <p>Entrada: {News.entrance}</p>
              </div>
              <div>
                {News.photos.length ? (
                  News.photos.map((photo) => {
                    return (
                      <div>
                        <img
                          src={`${VITE_API_URL}/uploads/${photo.name}`}
                          alt="foto"
                        />
                      </div>
                    );
                  })
                ) : (
                  <p>La entrada no tiene imagenes</p>
                )}
              </div>
              <div>
                <span>{News.votes} | </span>
                <span>
                  Fecha: {new Date(News.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default Search;
