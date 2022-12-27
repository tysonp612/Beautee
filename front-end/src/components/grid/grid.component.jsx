import React, { useState, useEffect } from "react";
import "./grid.style.css";
//Component takes in opening hour and close hour from admin page
export const GridComponent = ({ openHour, closeHour }) => {
  let totalOpeningHour = closeHour - openHour;
  useEffect(() => {}, [totalOpeningHour]);
  const gridHourArr = Array.from(document.querySelectorAll(".grid-hour"));

  const [bookings, setBookings] = useState([]);
  //1. calculate the total amount of opening hour

  console.log(totalOpeningHour);
  const renderHour = () => {
    let openHourArr = [];
    let gridHourRender = [];
    //make a for loop, create an array of all open hour [10,11,12...]
    for (let i = openHour; i <= closeHour; i++) {
      openHourArr.push(i);
    }
    //create another array, loop through the open hour array, get the index, and return a div with grid colum = index * 4+1/index*4+5
    const map = openHourArr.forEach((el, i) => {
      gridHourRender.push(
        <div
          className="grid-hour"
          key={el}
          //   onClick={(e) => handleChange(i * 4 + 1, 60)}
          style={{
            gridColumnStart: `${i * 4 + 1}`,
            gridColumnEnd: `${i * 4 + 1 + 4}`,
          }}
        >
          {el}
        </div>
      );
    });

    return gridHourRender;
  };
  //   const handleChange = (gridStart, time) => {
  //     let a;
  //     if (time === 60) {
  //       a = 4;
  //     }
  //     return setBookings(
  //       <div
  //         style={{
  //           gridColumnStart: `${gridStart}`,
  //           gridColumnEnd: `${gridStart + a}`,
  //           backgroundColor: "red",
  //         }}
  //       >
  //         a
  //       </div>
  //     );
  //   };

  //   TRY TO FIND THE GIRD START OF SOME HOUR
  const findGrid = (time, duration) => {
    if (time > closeHour) {
      closeHour = time;
      totalOpeningHour = closeHour - openHour;
    } else if (time < openHour) {
      openHour = time;
      totalOpeningHour = closeHour - openHour;
    } else {
      let a;
      a = gridHourArr && gridHourArr.find((el) => el.innerHTML == time);
      console.log(a.style.gridColumnStart);
      // return a;
    }
  };

  findGrid(6);
  return (
    <div>
      <div
        className="grid-wrapper"
        style={{
          gridTemplateColumns: `repeat(${totalOpeningHour * 4},80px)`,
          gridTemplateRows: "30px 1fr",
        }}
      >
        {renderHour()}
        {bookings}
      </div>
    </div>
  );
};
