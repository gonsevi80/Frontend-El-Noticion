const deleteUserService = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
};

export default deleteUserService;
