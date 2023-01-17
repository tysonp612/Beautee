import axios from "axios";
export const createPaymentIntent = async (authToken, bookingId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { bookingId: bookingId },
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};
