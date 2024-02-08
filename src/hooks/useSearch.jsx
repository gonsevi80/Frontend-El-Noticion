import { useContext } from "react";
import { SearchContext } from "./SearchContext"; // Asegúrate de ajustar la ruta de importación según sea necesario

export const useSearch = () => {
  return useContext(SearchContext);
};
