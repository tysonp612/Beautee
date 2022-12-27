import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
//login page
import { LoginPage } from "./pages/login/login.page";
//register page
import { RegisterPage } from "./pages/register/register.page";
//activate page
import { ActivatePage } from "./pages/activate/activate.page";
//forgot-password
import { ForgotPassowrd } from "./pages/forgot-password/forgot-password.page";
//reset-password page
import { ResetPassword } from "./pages/reset-password/reset-password.page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Routes>
        {/* //Authentication */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate/:token" element={<ActivatePage />} />
        <Route path="/forgot-password" element={<ForgotPassowrd />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
