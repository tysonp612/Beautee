import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadAllBookings } from "./../../utils/bookings/bookings.utils";
import { loadAllServices } from "./../../utils/services/services.utils";
import { getAllTechnicians } from "./../../utils/technician/technician.utils";
//date-picker
import { DatePickerComponent } from "./../../components/date-picker/date-picker.component";
//modal
import { BookingsControlModal } from "../../components/modal/bookings/bookings-modal.component";
//grid
import { GridComponent } from "./../../components/grid/grid.component";
export const AdminPage = () => {
  const [reload, setReload] = useState(false);
  const [allBookings, setAllBookings] = useState(null);
  const [totalOpenHour, setTotalOpenHour] = useState([]);
  const [allTechnicians, setAllTechnicians] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [date, setDate] = useState();
  const adminToken = useSelector((state) => state.user.currentUser.token);
  const userRole = useSelector((state) => state.user.currentUser.role);

  //   As the page loads, load all the bookings from DB
  useEffect(() => {
    getAllBookings();
    getTotalOpenHour();
    getTechnicians();
    getServices();
  }, [date, reload]);
  const getAllBookings = () => {
    if (date) {
      return loadAllBookings(adminToken, date.toDateString())
        .then((res) => setAllBookings(res.data))
        .catch((err) => console.log(err));
    }
  };
  //To create bookings, start in admin page, load all technicians, all services, total open hour, pass it to Booking control modal componenet
  const getTechnicians = () => {
    return getAllTechnicians(adminToken)
      .then((res) => {
        setAllTechnicians(res.data.users);
      })
      .catch((err) => console.log(err));
  };
  const getServices = () => {
    return loadAllServices()
      .then((res) => {
        setAllServices(res.data.services);
      })
      .catch((err) => console.log(err));
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
        reload={reload}
        setReload={setReload}
        adminToken={adminToken}
      />
      <DatePickerComponent setDate={setDate} />
      {/* THIS PART IS FOR CREATE BOOKINGS AND EDIT BOOKINGS */}
      <BookingsControlModal
        totalOpenHour={totalOpenHour}
        allTechnicians={allTechnicians}
        allServices={allServices}
        setReload={setReload}
        reload={reload}
      />
    </div>
  );
};
