import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./bookings-modal.style.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { findClient } from "./../../utils/clients/clients.utils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const BookingsControlModal = () => {
  //DECLARE VARIABLES
  const [open, setOpen] = useState(false);
  const [hideSearchBox, setHideSearchBox] = useState(true);
  const [bookingInfo, setBookingInfo] = useState({
    client: null,
  });
  const [clientSearch, setClientSearch] = useState([]);
  const [clientNamePlaceholder, setClientNamePlaceholder] = useState("");
  const dispatch = useDispatch();
  const hourSelected = useSelector((state) => state.bookings.hourAdded);
  const adminToken = useSelector((state) => state.user.currentUser.token);

  useEffect(() => {
    if (hourSelected) {
      setOpen(true);
    }
  }, [hourSelected]);

  //HANDLE
  const handleClose = () => {
    dispatch({
      type: "ADD_HOUR",
      payload: null,
    });
    setOpen(false);
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
              setBookingInfo({ ...bookingInfo, client: el });
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
            onClick={(e) => console.log("hehe")}
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-title">Schedule Booking</div>
          <div className="modal-input-wrapper">
            <div className="modal-input-container">
              <div className="modal-customer-search">
                <input
                  className="searchBox-input"
                  type="text"
                  value={clientNamePlaceholder}
                  onFocus={() => setHideSearchBox(false)}
                  placeholder="Search customers"
                  onChange={(e) => {
                    setClientNamePlaceholder(e.target.value);
                    handleFindClients(e.target.value);
                  }}
                />
                <div hidden={hideSearchBox} className="searchBox">
                  {renderFindClients()}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
