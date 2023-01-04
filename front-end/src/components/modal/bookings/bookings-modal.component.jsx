//MAIN REACT METHOD AND STYLES
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./bookings-modal.style.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
//TOAST
import { toast } from "react-toastify";

import { useEffect } from "react";
//UTILS
import { findClient } from "./../../../utils/clients/clients.utils";

import {
  createBooking,
  loadOneBooking,
  editBooking,
} from "./../../../utils/bookings/bookings.utils";

//COMPONENTS
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
//General ideal: each part contains its own purpose, like hour pick, technician pick, date pick, note ,services, price...
export const BookingsControlModal = ({
  totalOpenHour,
  allTechnicians,
  allServices,
  reload,
  setReload,
}) => {
  //DECLARE VARIABLES
  const hourSelectedFromState = useSelector(
    (state) => state.bookings.hourAdded
  );
  const editIdSelected = useSelector((state) => state.bookings.editId);
  const [open, setOpen] = useState(false);
  const [hideSearchBox, setHideSearchBox] = useState(true);
  const [hourSelected, setHourSelected] = useState("");
  const [bookingInfo, setBookingInfo] = useState({
    id: null,
    timeBooked: null,
    client: null,
    duration: "",
    worker: "",
    services: [],
    price: "",
    date: null,
    note: "",
  });
  const [clientSearch, setClientSearch] = useState([]);
  const [openCreateClientModal, setOpenCreateClientModal] = useState(true);
  const [clientNamePlaceholder, setClientNamePlaceholder] = useState("");
  const [servicesForEdit, setServicesForEdit] = useState([]);
  const dispatch = useDispatch();

  const adminToken = useSelector((state) => state.user.currentUser.token);

  useEffect(() => {
    //1. As the page loads, first check if all technician and services are loaded
    if (allTechnicians.length > 0 && allServices.length > 0) {
      //2. Check if it's an order for creating booking or edit booking
      //if it's edit (user clicked on edit button, an id is stored in state and will be checked as the page loads, if we can extract that id, it means it is an edit order, if not, it is for creating new booking)
      if (editIdSelected) {
        // if it is for edit, run this function to load set information for editting
        loadBookingForEdit(editIdSelected);
        //open the modal
        setOpen(true);
      } else if (hourSelectedFromState) {
        //set state to null,
        dispatch({
          type: "ADD_HOUR",
          payload: null,
        });
        setHourSelected(hourSelectedFromState);
        const admin = allTechnicians.find((el) => el.role === "admin")._id;
        setOpen(true);
        //if it's new booking, some fixed information is the default technician(worker) and the time chosen (extract from state)
        setBookingInfo({
          ...bookingInfo,
          worker: admin,
          timeBooked: hourSelectedFromState,
        });
      }
    }
  }, [
    //page will change under these conditions: hour changed, when new client modal is opened, when new client is found, or edit Id is changed
    hourSelectedFromState,
    editIdSelected,
  ]);

  //HANDLE
  const handleClose = () => {
    dispatch({
      type: "ADD_HOUR",
      payload: null,
    });
    dispatch({
      type: "ADD_EDIT_ID",
      payload: null,
    });

    setServicesForEdit([]);
    setHourSelected("");
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
    setHideSearchBox(true);
    setClientNamePlaceholder("");
    setOpen(false);
    setOpenCreateClientModal(true);
  };
  //*** Remake this as a helper
  const formatServicesArrForEdit = (data) => {
    let arr = [];
    if (data.actualService.length > 0) {
      data.actualService.forEach((el) => arr.push(el.service));
    } else if (data.mainService.length > 0) {
      data.mainService.forEach((el) => arr.push(el.service));
    }
    return arr;
  };
  //Set state for edit booking
  const loadBookingForEdit = (id) => {
    return loadOneBooking(adminToken, id)
      .then((res) => {
        setHourSelected(res.data.timeOfBooking);
        setBookingInfo({
          ...bookingInfo,
          id: res.data._id,
          client: res.data.client._id,
          worker: res.data.user._id,
          timeBooked: res.data.timeOfBooking,
          duration: res.data.period,
          date: res.data.date,
          services:
            res.data.services.actualService.length > 0
              ? res.data.services.actualService
              : res.data.services.mainService,
          price: res.data.price.estimatedPrice,
          note: res.data.note,
        });
        //2 things that needed to workaround are client name and services
        setClientNamePlaceholder(
          `${res.data.client.first_name} ${res.data.client.last_name} - ${res.data.client.number}`
        );
        setServicesForEdit(formatServicesArrForEdit(res.data.services));
      })
      .catch((err) => console.log(err));
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
    } else if (
      !bookingInfo.date ||
      Date.parse(new Date().toDateString()) > Date.parse(bookingInfo.date)
    ) {
      toast.error("Invalid date!");
    } else {
      if (editIdSelected) {
        editBooking(adminToken, bookingInfo)
          .then((res) => {
            toast.success(res.data.message);
            handleClose();
            setReload(!reload);
          })
          .catch((err) => toast.error(err.response.data.message));
      } else {
        createBooking(adminToken, bookingInfo)
          .then((res) => {
            toast.success(res.data.message);
            handleClose();
            setReload(!reload);
          })
          .catch((err) => toast.error(err.response.data.message));
      }
    }
  };
  const handleFindClients = (keyword) => {
    return findClient(adminToken, keyword)
      .then((res) => setClientSearch(res.data.client))
      .catch((err) => console.log(err));
  };
  //*** REWORK AS A COMPONENT
  const renderFindClients = () => {
    let clientsArr = [];
    //after sending request to BE, data will be stored in clientSearch
    if (clientSearch) {
      clientSearch.forEach((el) =>
        //forEach of the client object, push as a div element with all needed information, this will be used as search box showing all result of client, also clickable to choose the client
        clientsArr.push(
          <div
            className="client-pick-container"
            style={{ cursor: "pointer" }}
            key={el._id}
            onClick={(e) => {
              //client's id is stored in main bookingInfo state
              setBookingInfo({ ...bookingInfo, client: el._id });
              // Another state (clientNamePlaceholder)This is needed to render to search bar, see line 268
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
      //if not client is found, with same array, push the no client found and 1 option to open create client modal
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
              {/* input value cannot be set directly to bookingInfo.client because we store client's id, not name, so we need to workaround on this one with clientNamePlaceholder, this basically means as we click on client in the search box, we store the name in placeholder state, then use it as value for the input, while the id is stored in bookingInfo */}
              <input
                className="searchBox-input"
                type="text"
                value={clientNamePlaceholder}
                placeholder="Search customers"
                //As user click on the input box at first, it will fire a request to backend with value of " ", this ensure that even before user type anything, we will render all client in DB
                onClick={() => {
                  handleFindClients(" ");
                  setHideSearchBox(false);
                }}
                onChange={(e) => {
                  //Change the value on input box as letter changes, also send value to BE to find client matches with value
                  setClientNamePlaceholder(e.target.value);
                  handleFindClients(e.target.value);
                }}
              />
              <div hidden={hideSearchBox} className="searchBox">
                {/* This is where we trigger the render search box function, this will show the search box with all client clickable option */}
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
              setHourSelected={setHourSelected}
              hourSelected={hourSelected}
            />
            {/* PICK SERVICES AND PRICE*/}
            <ServicesPick
              servicesForEdit={servicesForEdit}
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
