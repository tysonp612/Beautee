import axios from "axios";
export const getAllTechnicians = async (adminToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/getAllUsers`,
    {},
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};
