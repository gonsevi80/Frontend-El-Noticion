const deleteNewsService = async (newsId, token) => {
  console.log(
    "Enviando solicitud DELETE para eliminar la noticia con ID:",
    newsId
  );

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/news/${newsId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error al eliminar la noticia:", errorData);
    throw new Error(errorData.message);
  }

  console.log("Noticia eliminada correctamente.");
  return await response.json();
};

export default deleteNewsService;
