import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { login } from "../../services/auth.services";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const inputHandler = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const loginHandler = async () => {
    const token = await login(credentials)
    const decoded = jwtDecode(token)
    console.log(token, "mi token")
    console.log(decoded, "yo soy la info del token")

    if (token) {

      const userData = {
        token: token,
        decoded: decoded
      }
  
      localStorage.setItem("userData", JSON.stringify(userData))
    } else  {
      console.log("login sin éxito")
    }

  }

  return (
    <div className="login-container">
      Soy login
      <Link to="/">Home</Link>
      <CustomInput
        type="email"
        name="email"
        placeholder="Introduce Email"
        value={credentials.email}
        handler={inputHandler}
      />
      <CustomInput
        type="password"
        name="password"
        placeholder="Introduce tu contraseña"
        value={credentials.password}
        handler={inputHandler}
      />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}
