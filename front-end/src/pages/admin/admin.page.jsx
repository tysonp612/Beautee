import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadAllBookings } from "./../../utils/bookings/bookings.utils";
//date-picker
import { DatePickerComponent } from "./../../components/date-picker/date-picker.component";
//modal
import { BookingsControlModal } from "../../components/modal/bookings/bookings-modal.component";
//grid
import { GridComponent } from "./../../components/grid/grid.component";
export const AdminPage = () => {
  const [allBookings, setAllBookings] = useState(null);
  const [totalOpenHour, setTotalOpenHour] = useState([]);
  const [date, setDate] = useState(new Date());
  const adminToken = useSelector((state) => state.user.currentUser.token);
  const userRole = useSelector((state) => state.user.currentUser.role);

  //   As the page loads, load all the bookings from DB
  useEffect(() => {
    getAllBookings();
    getTotalOpenHour();
  }, [date]);
  const getAllBookings = () => {
    if (date) {
      return loadAllBookings(adminToken, date.toDateString())
        .then((res) => setAllBookings(res.data))
        .catch((err) => console.log(err));
    }
  };
  const openHour = 10;
  const closeHour = 19;
  const getTotalOpenHour = () => {
    let arr = [];
    for (let i = openHour; i <= closeHour; i++) {
      arr.push(i);
    }
    return setTotalOpenHour(arr);
  };
  return (
    <div>
      HELLO FROM ADMIN
      {/* GRID */}
      <GridComponent
        openHour={openHour}
        closeHour={closeHour}
        allBookings={allBookings}
        userRole={userRole}
      />
      <DatePickerComponent setDate={setDate} />
      <BookingsControlModal totalOpenHour={totalOpenHour} />
    </div>
  );
};
