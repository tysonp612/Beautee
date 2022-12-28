import axios from "axios";
export const loadAllBookings = async (token, date) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_getAllBookings`,
    { date },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
