import React, { useEffect, useState } from "react";
//style
import "./admin-page.style.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  loadAllServices,
  createNewService,
} from "./../../utils/services/services.utils";

export const AdminServicePage = () => {
  const userToken = useSelector((state) => state.user.currentUser.token);
  const [reload, setReload] = useState(false);
  const [allServices, setAllServices] = useState([]);

  const [newService, setNewService] = useState({
    name: null,
    price: null,
  });
  const { name, price } = newService;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    return createNewService(newService, userToken)
      .then((res) => {
        setReload(!reload);
        toast.success("Service created!");
        setNewService({ name: "", price: "" });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getServices();
  }, [reload]);
  const getServices = () => {
    return loadAllServices()
      .then((res) => {
        setAllServices(res.data.services);
        console.log(res.data.services);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="services-wrapper">
        <div className="services-container">
          <div className="new-services">
            <div className="services-header">New Services</div>
            <div className="new-services-form">
              <div className="services-name">Service name:</div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => handleInputChange(e)}
                className="services-input"
              />
              <div className="services-name">Service price:</div>
              <input
                name="price"
                value={price}
                onChange={(e) => handleInputChange(e)}
                type="number"
                className="services-input"
              />
              <br />
              <button onClick={(e) => handleSubmit(e)}>Add new service</button>
            </div>
          </div>
          <div className="existing-services">
            <div className="services-header">Existing Services</div>

            {allServices &&
              allServices.map((el) => (
                <div className="existing-services-list">{`${el.service} - $${el.price}`}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
