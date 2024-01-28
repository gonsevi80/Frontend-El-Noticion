const getNewsByEntranceService = async () => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/news`;
  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
};

export default getNewsByEntranceService;
