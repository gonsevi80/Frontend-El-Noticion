const modifyUserService = async (data, token) => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/users/update`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      authorization: token,
    },
    body: data,
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);
};

export default modifyUserService;
