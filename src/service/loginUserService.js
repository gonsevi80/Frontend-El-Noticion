export const loginUserService = async ({email, passwd}) => {

    const url = `${import.meta.env.VITE_API_URL}/users/login`;

    const dataLogin = {
        email,
        password: passwd
    };

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataLogin)
    });

    
    const json = await response.json();

    if(!response.ok) throw new Error(json.message);

    return json.data.token;


}