const validateUserService = async (registrationCode) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/users/validate/${registrationCode}`;

  const response = await fetch(url, {
    method: "PUT",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al activar la cuenta");
  }

  return response.json();
};

export default validateUserService;
