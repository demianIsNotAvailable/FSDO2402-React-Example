import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="home-container">
            <h1>Hola, soy home, bienvenido</h1>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
        </div>
    )
}