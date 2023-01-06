import { BookingsActionTypes } from "./bookings.types";
const INITIAL_STATE = {
  hourAdded: null,
  editId: null,
  showBookingId: null,
  openPaymentModalId: null,
};
export const bookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookingsActionTypes.ADD_HOUR:
      return { ...state, hourAdded: action.payload };
    case BookingsActionTypes.ADD_EDIT_ID:
      return { ...state, editId: action.payload };
    case BookingsActionTypes.ADD_SHOW_BOOKING_ID:
      return { ...state, showBookingId: action.payload };
    case BookingsActionTypes.ADD_OPEN_PAYMENT_MODAL_ID:
      return { ...state, openPaymentModalId: action.payload };
    default:
      return state;
  }
};
