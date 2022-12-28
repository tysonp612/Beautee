import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadAllBookings } from "./../../utils/bookings/bookings.utils";
//date-picker
import { DatePickerComponent } from "./../../components/date-picker/date-picker.component";
//grid
import { GridComponent } from "./../../components/grid/grid.component";
export const AdminPage = () => {
  const [allBookings, setAllBookings] = useState(null);
  const [date, setDate] = useState(null);
  const adminToken = useSelector((state) => state.user.currentUser.token);

  //   As the page loads, load all the bookings from DB
  useEffect(() => {
    getAllBookings();
  }, [date]);
  const getAllBookings = () => {
    if (date) {
      return loadAllBookings(adminToken, date)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  const openHour = 10;
  const closeHour = 19;
  return (
    <div>
      HELLO FROM ADMIN
      {/* GRID */}
      <GridComponent openHour={openHour} closeHour={closeHour} />
      <DatePickerComponent setDate={setDate} />
    </div>
  );
};
