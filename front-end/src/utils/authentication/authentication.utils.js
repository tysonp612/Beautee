import axios from "axios";

//Reminder to change localhost websit to process.env later
//Register user
export const userRegister = async (credentials) => {
  return await axios.post(`http://localhost:8000/api/auth_register`, {
    credentials,
  });
};
//Activate account
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
//Resend token
export const resendActivationToken = async (email) => {
  return await axios.post(`http://localhost:8000/api/auth_resendVerifyLink`, {
    email: email,
  });
};

//Send password reset link
export const sendPasswordResetLink = async (email) => {
  return await axios.post(
    `http://localhost:8000/api/auth_sendResetPasswordEmail`,
    {
      email: email,
    }
  );
};

//Update password
export const updatePassword = async (token, password) => {
  return await axios.post(
    `http://localhost:8000/api/auth_resetPassword`,
    {
      password: password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Login user
export const logIn = async (loginCredentials) => {
  return await axios.post(`http://localhost:8000/api/auth_login`, {
    loginCredentials,
  });
};

export const adminCheck = async (token) => {
  return await axios.post(
    `http://localhost:8000/api/admin_check`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
