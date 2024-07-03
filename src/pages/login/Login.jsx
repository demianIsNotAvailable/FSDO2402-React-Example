import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { loginCall } from "../../services/auth.services";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/auth-context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const {login} = useAuth()

  const inputHandler = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const loginHandler = async () => {
    const token = await loginCall(credentials)
    const decoded = jwtDecode(token)
    if (token) {

      const userData = {
        token: token,
        decoded: decoded
      }
  
      login(userData)
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
