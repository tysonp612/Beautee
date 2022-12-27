import { UserActionTypes } from "./user.types";
export const loginUser = (user) => {
  return { type: UserActionTypes.LOGGED_IN_USER, payload: user };
};
export const logoutUser = (user) => {
  return { type: UserActionTypes.LOG_OUT, payload: user };
};
