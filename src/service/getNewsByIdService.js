const getNewsByIdService = async (newsId) => {
  const url = `${import.meta.env.VITE_API_URL}/news/${newsId}`;

  const response = await fetch(url);

  const json = response.json();

  return json;
};

export default getNewsByIdService;
