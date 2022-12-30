import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./bookings-modal.style.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { findClient } from "./../../../utils/clients/clients.utils";
import { CreateClientModal } from "./create-client/create-client-modal.component";
import { TechnicianSection } from "./terchnician/technician.component";
import { PickHour } from "./pick-hour/pick-hour.component";
import { ServicesPick } from "./services/services.component";
import { BookingDatePickerComponent } from "./date/booking-date-picker.component";
import { NoteComponent } from "./note/booking-note.component";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const BookingsControlModal = ({
  totalOpenHour,
  allTechnicians,
  allServices,
}) => {
  //DECLARE VARIABLES
  const hourSelected = useSelector((state) => state.bookings.hourAdded);

  const [open, setOpen] = useState(false);
  const [hideSearchBox, setHideSearchBox] = useState(true);

  const [bookingInfo, setBookingInfo] = useState({
    timeBooked: hourSelected,
    client: null,
    duration: "",
    worker: "",
    services: [],
    price: "",
    date: new Date(),
    note: "",
  });
  const [clientSearch, setClientSearch] = useState([]);
  const [openCreateClientModal, setOpenCreateClientModal] = useState(true);
  const [clientNamePlaceholder, setClientNamePlaceholder] = useState("");

  const dispatch = useDispatch();

  const adminToken = useSelector((state) => state.user.currentUser.token);

  useEffect(() => {
    if (hourSelected && allTechnicians.length > 0) {
      const admin = allTechnicians.find((el) => el.role === "admin")._id;
      setOpen(true);
      setBookingInfo({
        ...bookingInfo,
        worker: admin,
        timeBooked: hourSelected,
      });
    }
  }, [hourSelected, openCreateClientModal, clientSearch]);

  //HANDLE
  const handleClose = () => {
    dispatch({
      type: "ADD_HOUR",
      payload: null,
    });
    setBookingInfo({
      ...bookingInfo,
      timeBooked: null,
      client: null,
      duration: "",
      worker: "",
      services: [],
      price: "",
      date: null,
      note: "",
    });
    setClientNamePlaceholder("");
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //DO VALIDATION

    if (!bookingInfo.client) {
      toast.error("Client is required!");
    } else if (bookingInfo.duration.length === 0) {
      toast.error("Duration field is required!");
    } else if (bookingInfo.services.length === 0) {
      toast.error("Services can not be empty!");
    } else if (bookingInfo.price.length === 0) {
      toast.error("Price is required!");
    } else if (bookingInfo.price === 0) {
      toast.error("Price must be larger than $0");
    } else if (new Date() > Date.parse(bookingInfo.date)) {
      toast.error("Invalid date!");
    } else {
      toast.success("A reservation has been created successfully!");
    }
    console.log(bookingInfo);
  };
  const handleFindClients = (keyword) => {
    return findClient(adminToken, keyword)
      .then((res) => setClientSearch(res.data.client))
      .catch((err) => console.log(err));
  };
  const renderFindClients = () => {
    let clientsArr = [];
    if (clientSearch) {
      clientSearch.forEach((el) =>
        clientsArr.push(
          <div
            className="client-pick-container"
            style={{ cursor: "pointer" }}
            key={el._id}
            onClick={(e) => {
              setBookingInfo({ ...bookingInfo, client: el._id });
              setClientNamePlaceholder(
                `${el.first_name} ${el.last_name} - ${el.number}`
              );
              setHideSearchBox(true);
            }}
          >
            <div className="client-pick">{`${el.first_name} ${el.last_name} - ${el.number}`}</div>
          </div>
        )
      );
    } else {
      clientsArr.push(
        <div key={"N/A"}>
          <div>No Customer found</div>
          <div
            onClick={(e) => {
              setOpenCreateClientModal(false);
            }}
            style={{ cursor: "pointer" }}
          >
            Click here to create new customer
          </div>
        </div>
      );
    }
    return clientsArr;
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="modal-title">Schedule Booking</div>
        <div className="modal-input-wrapper">
          <div className="modal-input-container">
            <div className="customer-search-section">
              <input
                className="searchBox-input"
                type="text"
                value={clientNamePlaceholder}
                placeholder="Search customers"
                onClick={() => {
                  handleFindClients(" ");
                  setHideSearchBox(false);
                }}
                onChange={(e) => {
                  console.log(bookingInfo);
                  setClientNamePlaceholder(e.target.value);
                  handleFindClients(e.target.value);
                }}
              />
              <div hidden={hideSearchBox} className="searchBox">
                {renderFindClients()}
                <div
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={(e) => setHideSearchBox(true)}
                >
                  X
                </div>
              </div>
            </div>
            {/* CREATE-CLIENT */}
            <div className="create-client-section">
              <p
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setHideSearchBox(true);
                  setOpenCreateClientModal(false);
                }}
              >
                Cant find user, click here to create user
              </p>
            </div>
            {/* PICK TECHICIANS */}

            <TechnicianSection
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo}
              allTechnicians={allTechnicians}
            />
            {/* PICK-HOUR */}
            <PickHour
              totalOpenHour={totalOpenHour}
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo}
              hourSelected={hourSelected}
            />
            {/* PICK SERVICES AND PRICE*/}
            <ServicesPick
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo}
              allServices={allServices}
            />
            {/* DATE-PICK */}
            <BookingDatePickerComponent
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo}
            />
            <NoteComponent
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo}
            />
            <div className="submit-button-sec">
              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
          </div>
        </div>
        <CreateClientModal
          setOpenCreateClientModal={setOpenCreateClientModal}
          openCreateClientModal={openCreateClientModal}
          setClientNamePlaceholder={setClientNamePlaceholder}
          setBookingInfo={setBookingInfo}
          bookingInfo={bookingInfo}
        />
      </Box>
    </Modal>
  );
};
