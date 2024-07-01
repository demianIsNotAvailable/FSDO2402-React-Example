const BASE_URL = "http://localhost:27017";

export const getProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/user`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error, "Error al recuperar mi perfil");
  }
};

export const getAllUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/user/find`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (data, token) => {
  console.log(data, token, "somos data y token en updateProfile");
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // data = {email: "nuevo email", name: "nuevo name"...}
  };

  try {
    const response = await fetch(`${BASE_URL}/user`, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const updateUserById = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data), // data = {email: "nuevo email", name: "nuevo name"...}
  };

  try {
    const response = await fetch(`${BASE_URL}/user`, options);
    const data = await response.json();
    console.log(response)
    console.log(data, "estamso actualizados=");
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

/*
auth

const token = req.headers.Authorization.split(" ")[1]

`Bearer eY.fasdhfiuo3hjnfjksd8939urqrfjfg.sdfgosdfy78y2gyhqfhuui`
["Bearer", "eY.fasdhfiuo3hjnfjksd8939urqrfjfg.sdfgosdfy78y2gyhqfhuui"]

*/
