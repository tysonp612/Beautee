import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
};
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOGGED_IN_USER:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.LOG_OUT:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
