const newNewsService = async ({ data, token }) => {
  const url = `${import.meta.env.VITE_API_URL}/news`;

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json.data;
};

export default newNewsService;
