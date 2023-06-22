import axios from "axios";
export const loadAllServices = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/getAllServices`);
};

export const createNewService = async (service, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createServices`,
    { serviceData: service },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
