import { BookingsActionTypes } from "./bookings.types";
export const addHour = (hour) => {
  return { type: BookingsActionTypes.ADD_HOUR, payload: hour };
};

export const addEdit = (editId) => {
  return { type: BookingsActionTypes.ADD_EDIT_ID, payload: editId };
};

export const addShowBooking = (bookingId) => {
  return { type: BookingsActionTypes.ADD_SHOW_BOOKING_ID, payload: bookingId };
};
