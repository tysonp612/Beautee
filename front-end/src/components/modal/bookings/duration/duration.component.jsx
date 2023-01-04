import React from "react";

export const DurationPick = ({ setBookingInfo, bookingInfo }) => {
  return (
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
  );
};
