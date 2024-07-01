import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import Admin from "./pages/admin/Admin";
import { PrivateRoute } from "./components/private-route/PrivateRoute";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token; // nuestro token || undefined

  return (
    <>
        <Header className="header-design" />
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<PrivateRoute Page={Profile} />} />

          {token && <Route path="admin" element={<Admin />} />}
        </Routes>

    </>
  );
}

export default App;
