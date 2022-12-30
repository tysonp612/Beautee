import React, { useState, useEffect } from "react";

export const PickHour = ({
  bookingInfo,
  setBookingInfo,
  totalOpenHour,
  hourSelected,
}) => {
  const [dummyHour, setDummyHour] = useState(hourSelected);
  useEffect(() => {
    if (hourSelected) {
      setBookingInfo({ ...bookingInfo, timeBooked: hourSelected });
      setDummyHour(hourSelected);
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
    <div className="starting-time-section">
      <div className="starting-hour-section">
        Hour select
        <select
          onChange={(e) => {
            setDummyHour(+e.target.value);
            setBookingInfo({ ...bookingInfo, timeBooked: +e.target.value });
            console.log(bookingInfo);
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
          name="startingMinutesSelect"
          id="startingMinutesSelect"
          onChange={(e) =>
            setBookingInfo({
              ...bookingInfo,
              timeBooked: dummyHour + Number(e.target.value),
            })
          }
        >
          <option value="0">{`${dummyHour}:00`}</option>
          <option value="0.25">{`${dummyHour}:15`}</option>
          <option value="0.50">{`${dummyHour}:30`}</option>
          <option value="0.75">{`${dummyHour}:45`}</option>
        </select>
      </div>
    </div>
  );
};
