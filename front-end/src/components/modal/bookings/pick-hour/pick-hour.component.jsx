import React, { useState, useEffect } from "react";

export const PickHour = ({
  bookingInfo,
  setBookingInfo,
  totalOpenHour,
  hourSelected,
  setHourSelected,
}) => {
  const [dummyHour, setDummyHour] = useState(hourSelected);
  useEffect(() => {
    if (hourSelected) {
      if (hourSelected.toString().includes(".")) {
        setDummyHour(hourSelected.toString().split(".")[0]);
      } else {
        setDummyHour(hourSelected);
      }
    }
  }, [hourSelected]);
  const renderTotalHour = () => {
    let renderHourArr = [];
    if (totalOpenHour) {
      totalOpenHour.forEach((el) => {
        renderHourArr.push(
          <option value={el} key={el}>
            {el}
          </option>
        );
      });
    }
    return renderHourArr;
  };
  return (
    <div>
      <div className="starting-time-section">
        <div className="starting-hour-section">
          Hour select
          <select
            onChange={(e) => {
              setBookingInfo({ ...bookingInfo, timeBooked: +e.target.value });
              setHourSelected(+e.target.value);
            }}
            name="startingHourSelect"
            value={dummyHour}
            id="startingHourSelect"
          >
            {renderTotalHour()}
          </select>
        </div>

        <div className="starting-minutes-section">
          Minutes select
          <select
            value={bookingInfo.timeBooked}
            name="startingMinutesSelect"
            id="startingMinutesSelect"
            onChange={(e) => {
              setBookingInfo({
                ...bookingInfo,
                timeBooked: +e.target.value,
              });
              setHourSelected(+e.target.value);
            }}
          >
            <option value={+dummyHour + 0}>{`${dummyHour}:00`}</option>
            <option value={+dummyHour + 0.25}>{`${dummyHour}:15`}</option>
            <option value={+dummyHour + 0.5}>{`${dummyHour}:30`}</option>
            <option value={+dummyHour + 0.75}>{`${dummyHour}:45`}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
