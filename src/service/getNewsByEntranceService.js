const getNewsByEntranceService = async (currentPlace) => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/news?entrance=${currentPlace}`;

  const response = await fetch(url);

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
};

export default getNewsByEntranceService;
