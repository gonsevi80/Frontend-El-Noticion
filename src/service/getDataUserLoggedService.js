
const getDataUserLoggedService = async ( {token} ) => {

    const url = `${import.meta.env.VITE_API_URL}/users`;

    const response = await fetch(url,{
        headers: {
            authorization: token
        }
    });

    const json = await response.json();

    if(!response.ok) throw new Error(json.message);

    return json.data.user;
}


export default getDataUserLoggedService;