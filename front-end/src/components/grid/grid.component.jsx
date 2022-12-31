import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BookingsActionTypes } from "./../../redux/reducers/bookings/bookings.types";
//Contrast color helper
import { getContrast } from "./../../helper/contrast-color";
import { getFormattedTime } from "./../../helper/format-hour";
import { formatServices } from "./../../helper/format-services";
import "./grid.style.css";
//Component takes in opening hour and close hour from admin page
export const GridComponent = ({
  reload,
  openHour,
  closeHour,
  allBookings,
  userRole,
}) => {
  let totalOpeningHour = closeHour - openHour;
  const dispatch = useDispatch();
  const [hourGrid, setHourGrid] = useState([]);
  const [hourData, setHourData] = useState([]);
  const [bookingsDummy, setBookingDummy] = useState([]);
  useEffect(() => {
    renderHour();
    renderBookings();
  }, [totalOpeningHour, allBookings, reload]);
  //1. calculate the total amount of opening hour
  const renderHour = () => {
    let openHourArr = [];
    let gridHourRender = [];
    let gridHourData = [];
    //make a for loop, create an array of all open hour [10,11,12...]
    for (let i = openHour; i <= closeHour; i++) {
      openHourArr.push(i);
    }
    //create another array, loop through the open hour array, get the index, and return a div with grid colum = index * 4+1/index*4+5
    openHourArr.forEach((el, i) => {
      //This state will store all the grid data for hour, for ex [{hour:11,gridStart:29}]
      //Use this data to find the gridStart when we load all the bookings, for ex, booking has the property: timebooked: 11 => get gridStart of 29 at 11 by looping through this state and filter the hour
      gridHourData.push(
        { hour: el, gridStart: i * 4 + 1 },
        { hour: el + 0.25, gridStart: i * 4 + 2 },
        {
          hour: el + 0.5,
          gridStart: i * 4 + 3,
        },
        {
          hour: el + 0.75,
          gridStart: i * 4 + 4,
        }
      );
      //This will create an array, which inside will have the grid value of all hours for ex(7-19) with number indicating after every 4 grid space, this can be dynamically changed by changing totalOpening hour
      gridHourRender.push(
        <div
          className="grid-hour"
          key={i * 4 + 1}
          listid={i * 4 + 1}
          //IF ADMIN CLICK ON THE HOUR, MAKING A DISPATCH TO SAVE THE HOUR
          onClick={() =>
            dispatch({
              type: BookingsActionTypes.ADD_HOUR,
              payload: el,
            })
          }
          style={{
            cursor: `${userRole === "admin" ? "pointer" : ""}`,
            gridColumnStart: `${i * 4 + 1}`,
            gridColumnEnd: `${i * 4 + 1 + 4}`,
          }}
        >
          {el}
        </div>
      );
    });
    //After having 2 arrays of hourGrid and gridHourData, setState for future use
    setHourGrid(gridHourRender);
    setHourData(gridHourData);
  };

  const renderBookings = () => {
    let renderBookingsArr = [];
    if (allBookings && hourData.length > 0) {
      allBookings.forEach((booking) => {
        renderBookingsArr.push(renderGrid(booking));
      });
    }
    setBookingDummy(renderBookingsArr);
  };

  //   TRY TO FIND THE GIRD START OF AN HOUR
  const renderGrid = (booking) => {
    //WHAT IF THE OPENING TIME CHANGE?

    //Wait for the hourData array to load
    if (hourData.length > 0) {
      let timeToAdd;
      console.log();
      //loop through the array, find the element matches with the time, then extract its gridStart position
      const startGrid = hourData.find((el) => el.hour === booking.timeOfBooking)
        .gridStart;
      //switch cases for the durations
      switch (booking.period) {
        case 15:
          timeToAdd = 1;
          break;
        case 30:
          timeToAdd = 2;
          break;
        case 45:
          timeToAdd = 3;
          break;
        case 60:
          timeToAdd = 4;
          break;
        case 75:
          timeToAdd = 5;
          break;
        case 90:
          timeToAdd = 6;
          break;
        case 105:
          timeToAdd = 7;
          break;
        case 120:
          timeToAdd = 8;
          break;
      }
      //FIX NULL USER (TECHNICIAN)
      return (
        <div
          key={booking._id}
          className="booking"
          style={{
            gridColumnStart: `${startGrid}`,
            gridColumnEnd: `${startGrid + timeToAdd}`,
            backgroundColor: `${booking.user ? booking.user.color : "blue"}`,
            color: `${
              booking.user ? getContrast(booking.user.color) : "white"
            }`,
            overflow: "scroll",
          }}
        >
          <div className="booking-text">
            Time booked: {getFormattedTime(booking.timeOfBooking)} <br />{" "}
            Client's name:{" "}
            {`${booking.client.first_name} ${booking.client.last_name}`}
            {userRole === "admin" ? (
              <>
                <br /> Client's number: {booking.client.number}
              </>
            ) : (
              ""
            )}
            <br />
            Services booked: {formatServices(booking.services)} <br />
            Nail tech: {booking.user ? booking.user.username : "NULL"} <br />
            Note: {booking.note}
          </div>
          {/* //ADMIN CONDITIONALLY RENDER */}
          {userRole === "admin" ? (
            <div className="booking-option">
              <div
                className="option"
                onClick={(e) =>
                  dispatch({ type: "ADD_EDIT_ID", payload: booking._id })
                }
              >
                EDIT
              </div>
              <div className="option">DELETE</div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div
        className="grid-wrapper"
        style={{
          gridTemplateColumns: `repeat(${totalOpeningHour * 4},80px)`,
          gridTemplateRows: "30px ",
          gridAutoRows: "200px",
        }}
      >
        {hourGrid}
        {bookingsDummy}
      </div>
    </div>
  );
};
