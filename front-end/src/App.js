import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
//login page
import { LoginPage } from "./pages/login/login.page";
//register page
import { RegisterPage } from "./pages/register/register.page";
//activate page
import { ActivatePage } from "./pages/activate/activate.page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate/:token" element={<ActivatePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
