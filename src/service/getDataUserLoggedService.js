const getDataUserLoggedService = async ({ token }) => {
  const url = `${import.meta.env.VITE_API_URL}/users/login`;

  const response = await fetch(url, {
    headers: {
      authorization: token,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error al obtener datos del usuario. Código: ${response.status}, Mensaje: ${json.message}`
    );
  }
  return json.data.users;
};

export default getDataUserLoggedService;
