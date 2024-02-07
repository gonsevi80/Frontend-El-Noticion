const deleteNewsService = async (newsId, token) => {
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
    throw new Error(errorData.message);
  }

  return await response.json();
};

export default deleteNewsService;
