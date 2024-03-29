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

export const createBooking = async (adminToken, bookingData) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_createBooking`,
    { bookingData },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};
export const loadOneBooking = async (userToken, bookingId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_getOneBooking`,
    { id: bookingId },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

export const editBooking = async (adminToken, bookingData) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_updateBooking`,
    { bookingData },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};

export const userUpdateBooking = async (userToken, id, type, value) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_userUpdateBooking`,
    { id: id, type: type, value: value },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

export const sendToAdmin = async (userToken, bookingId, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_sendBookingToAdmin`,
    { id: bookingId, data: data },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

export const deleteBooking = async (userToken, bookingId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_deleteBooking`,
    { id: bookingId },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};
//USER
export const loadAllUserBookings = async (userToken, userId, date) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_loadUserBookings`,
    {
      id: userId,
      date: date,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

export const closeBooking = async (adminToken, bookingId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking_closeBooking`,
    { id: bookingId },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
};
