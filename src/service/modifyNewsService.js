const modifyNewsService = async (newsId, data, token) => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/news/${newsId}/edit`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      authorization: token,
    },
    body: data,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

<<<<<<< HEAD
  return json.data;
=======
  return "Modificación exitosa";
>>>>>>> 066981c08355d9a5b75bb0c6578ac914bca02176
};

export default modifyNewsService;
