const modifyNewsService = async (newsId, data, token) => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/news/${newsId}/edit`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      authorization: token,
    },

    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return "Modificación exitosa";
};

export default modifyNewsService;
