import axios from "axios";
export const findClient = async (adminToken, keyword) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/findClient`,
    {
      keyword: keyword,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const createClient = async (adminToken, clientData) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createClient`,
    {
      clientData: clientData,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};
