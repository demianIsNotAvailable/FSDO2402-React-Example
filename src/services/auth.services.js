
const BASE_URL = 'http://localhost:27017'

export const register = async (user) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    };
    try {

        const response = await fetch(`${BASE_URL}/user`, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error, 'algo ha salido mal en register')
    }
}

export const loginCall = async (credentials) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    try {
        const response = await fetch(`${BASE_URL}/user/login`, options)
        const data = await response.json()

        return data.token
    } catch (error) {
        console.log(error, "algo ha salido mal al hacer login")
    }
}