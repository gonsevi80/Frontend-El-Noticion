const changeRecoverPasswordService = async (data) => {
  const url = `${import.meta.env.VITE_API_URL}/users/password`;

  const response = await fetch(url, {
    method: "PUT",
    body: data,
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
};

export default changeRecoverPasswordService;
