import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useEffect, useState } from "react";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { register } from "../../services/auth.services";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState("")

  const navigate = useNavigate()

  const inputHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };

  const inputChecker = () => {
    let message = "";

    if (email === "") {
      message += "Email is required. ";
    }
    if (password === "") {
      message += "Password is required. ";
    }
    if (passwordConfirm === "") {
      message += "Password confirmation is required. ";
    }
    if (password !== passwordConfirm) {
      message += "Passwords do not match. ";
    }

    if (message === "") {
      setMsg("Registration succesful");
    } else {
      setMsg(message);
    }
  };

  const registerHandler = async () => {
    const newUser = {
      email: email,
      password: password
    }
    const res = await register(newUser)
    
    if (res) {
      console.log("nos hemos registrado")
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } else {
      setRegistrationErrorMsg("Error al registrarse")
    }
  }

  return (
    <div className="register-container">
      Soy register
      <Link to="/">Home</Link>
      <CustomInput
        type="email"
        name="email"
        placeholder="Introduce Email"
        value={email}
        handler={inputHandler}
      />
      <CustomInput
        type="password"
        name="password"
        placeholder="Introduce tu contraseña"
        value={password}
        handler={inputHandler}
      />
      <CustomInput 
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Passowrd"
        value={passwordConfirm}
        handler={inputHandler}
      />
      <button onClick={inputChecker}>Check inputs</button>
      <button onClick={registerHandler}>Register</button>
      <p>{msg}</p>
      <h1>{registrationErrorMsg}</h1>
    </div>
  );
}
