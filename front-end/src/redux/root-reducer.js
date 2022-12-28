import { combineReducers } from "redux";
import { userReducer } from "./reducers/user/user.reducer";
import { bookingsReducer } from "./reducers/bookings/bookings.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["cart"],
};
const rootReducer = combineReducers({
  user: userReducer,
  bookings: bookingsReducer,
});
export default persistReducer(persistConfig, rootReducer);
