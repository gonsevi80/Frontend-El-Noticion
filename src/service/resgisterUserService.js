const resgisterUserService = async ({ username, email, password }) => {
  const url = `${import.meta.env.VITE_API_URL}/users/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
};

export default resgisterUserService;
