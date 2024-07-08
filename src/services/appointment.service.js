const BASE_URL = "http://localhost:27017";


export const createAppointment = async (appointmentData, token) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData),
    };

    console.log(appointmentData, token)
    try {

        const response = await fetch(`${BASE_URL}/appointments`, options)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error, 'error al crear la cita')
    }
}