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
    <div>
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
      <div className="duration-section">
        Duration:
        <select
          name="duration"
          id="duraion"
          value={bookingInfo.duration}
          onChange={(e) => {
            setBookingInfo({ ...bookingInfo, duration: +e.target.value });
          }}
        >
          <option value="">Please choose duration</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
          <option value="75">1h:15min</option>
          <option value="90">1h:30min</option>
          <option value="105">1h:45min</option>
          <option value="120">2 hours</option>
        </select>
      </div>
    </div>
  );
};
