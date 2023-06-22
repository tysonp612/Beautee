import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
//Private Routes
import { UserRoute } from "./components/routes/user.routes";
import { AdminRoute } from "./components/routes/admin.routes";
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
//Admin page
import { AdminPage } from "./pages/admin/admin.page";
import { AdminServicePage } from "./pages/admin/admin-services.page";
//User page
import { UserPage } from "./pages/user/user.page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Drawer (Menu)
import { TemporaryDrawer } from "./components/drawer/drawer.component";
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

        {/* Protected Routes */}
        <Route exact path="/admin/bookings" element={<AdminRoute />}>
          <Route exact path="/admin/bookings" element={<AdminPage />}></Route>
        </Route>
        <Route exact path="/admin/services" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/services"
            element={<AdminServicePage />}
          ></Route>
        </Route>

        <Route exact path="/user/schedule" element={<UserRoute />}>
          <Route exact path="/user/schedule" element={<UserPage />}></Route>
        </Route>
      </Routes>
      <TemporaryDrawer />
      <ToastContainer />
    </div>
  );
}

export default App;
