import { BookingsActionTypes } from "./bookings.types";
const INITIAL_STATE = {
  hourAdded: null,
};
export const bookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookingsActionTypes.ADD_HOUR:
      return { ...state, hourAdded: action.payload };
    default:
      return state;
  }
};
