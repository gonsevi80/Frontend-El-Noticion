const AnadirPhotoService = async (newsId, data, token) => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/news/${newsId}/photos`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: token,
    },
    body: data,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return "Modificación exitosa";
};

export default AnadirPhotoService;
