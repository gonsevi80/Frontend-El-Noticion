const deletePhotoService = async (newsPhotosId, newsId, token) => {
  console.log(
    "Enviando solicitud DELETE para eliminar la foto con ID:",
    newsId
  );

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/news/${newsId}/photos/${newsPhotosId}`,
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
    console.error("Error al eliminar la foto:", errorData);
    throw new Error(errorData.message);
  }

  console.log("Foto eliminada correctamente.");
  return await response.json();
};

export default deletePhotoService;
