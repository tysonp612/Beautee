import axios from "axios";

//Reminder to change localhost websit to process.env later
export const userRegister = async (credentials) => {
  return await axios.post(`http://localhost:8000/api/auth_register`, {
    credentials,
  });
};
export const activaeAccount = async (token) => {
  return await axios.post(
    `http://localhost:8000/api/auth_activate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const resendActivationToken = async (email) => {
  return await axios.post(`http://localhost:8000/api/auth_resendVerifyLink`, {
    email: email,
  });
};
