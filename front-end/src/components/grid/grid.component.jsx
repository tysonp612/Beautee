import React, { useState, useEffect } from "react";
import "./grid.style.css";
//Component takes in opening hour and close hour from admin page
export const GridComponent = ({ openHour, closeHour }) => {
  let totalOpeningHour = closeHour - openHour;

  const [hourGrid, setHourGrid] = useState([]);
  const [hourData, setHourData] = useState([]);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    renderHour();
  }, [totalOpeningHour]);
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
          style={{
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

  //   TRY TO FIND THE GIRD START OF SOME HOUR
  const renderGrid = (time, duration) => {
    //WHAT IF THE TIME CHANGE?
    //delcare the bookings array, this array will be setState for all the bookings needed to be rendered
    let renderBookingsArr = [];
    //Wait for the hourData array to load
    if (hourData.length > 0) {
      let timeToAdd;
      //loop through the array, find the element matches with the time, then extract its gridStart position
      const startGrid = hourData.find((el) => el.hour === time).gridStart;
      //switch cases for the durations
      switch (duration) {
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

      //   renderBookingsArr.push(
      //     <div
      //       style={{
      //         gridColumnStart: `${startGrid}`,
      //         gridColumnEnd: `${startGrid + timeToAdd}`,
      //         backgroundColor: "red",
      //       }}
      //     ></div>
      //   );
      //   setBookings(renderBookingsArr);
      return (
        <div
          style={{
            gridColumnStart: `${startGrid}`,
            gridColumnEnd: `${startGrid + timeToAdd}`,
            backgroundColor: "red",
          }}
        ></div>
      );
    }
  };

  return (
    <div>
      <div
        className="grid-wrapper"
        style={{
          gridTemplateColumns: `repeat(${totalOpeningHour * 4},80px)`,
          gridTemplateRows: "30px auto",
        }}
      >
        {hourGrid}

        {renderGrid(12.75, 60)}
        {renderGrid(12, 60)}
      </div>
    </div>
  );
};
