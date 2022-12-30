import axios from "axios";
export const loadAllServices = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/getAllServices`);
};
