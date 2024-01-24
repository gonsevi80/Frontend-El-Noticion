const validateUserService = async (data) => {
    
    const url = `${import.meta.env.VITE_API_URL}/users/validate/:registrationCode`;

    const response = await fetch(url, {
        method: 'PUT',
       
    });

    const json = await response.json();

    if(!response.ok) throw new Error(json.message);

    return json;
}

export default validateUserService;