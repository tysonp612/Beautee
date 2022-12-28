import { BookingsActionTypes } from "./bookings.types";
export const addHour = (hour) => {
  return { type: BookingsActionTypes.ADD_HOUR, payload: hour };
};
