import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatPhoneNumber } from "./../../helper/format-phoneNumber";
import "./create-client-modal.style.css";
import { createClient } from "./../../utils/clients/clients.utils";
export const CreateClientModal = ({
  openCreateClientModal,
  setOpenCreateClientModal,
  setClientNamePlaceholder,
  setBookingInfo,
  bookingInfo,
}) => {
  const [clientData, setClientData] = useState({
    first_name: "",
    last_name: "",
    number: "",
    email: "",
  });
  const [phone, setPhone] = useState("");
  const { first_name, last_name, email, number } = clientData;
  const adminToken = useSelector((state) => state.user.currentUser.token);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };
  const handleSumit = (e) => {
    e.preventDefault();
    return createClient(adminToken, clientData)
      .then((res) => {
        toast.success(res.data.message);
        setClientNamePlaceholder(
          `${res.data.first_name} ${res.data.last_name} - ${res.data.number}`
        );
        setBookingInfo({ ...bookingInfo, client: res.data });
        setOpenCreateClientModal(true);
        setClientData({
          first_name: "",
          last_name: "",
          number: "",
          email: "",
        });
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="modal-create-clients" hidden={openCreateClientModal}>
      <div>
        First name
        <input
          type="text"
          required
          name="first_name"
          value={first_name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        Last name
        <input
          type="text"
          required
          name="last_name"
          value={last_name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        Number
        <input
          required
          type="text"
          name="number"
          value={number}
          maxLength="14"
          onChange={(e) => {
            let formatted = formatPhoneNumber(e.target.value);
            setPhone(formatted);
            setClientData({ ...clientData, number: formatted });
          }}
        />
      </div>
      <div>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button onClick={(e) => handleSumit(e)}>Submit</button>
    </div>
  );
};
