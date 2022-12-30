import React, { useEffect } from "react";

export const TechnicianSection = ({
  allTechnicians,
  bookingInfo,
  setBookingInfo,
}) => {
  const renderTechnicians = () => {
    let dummyArr = [];
    if (allTechnicians) {
      allTechnicians.forEach((el) =>
        dummyArr.push(
          <option key={el._id} value={el._id}>
            {el.username}
          </option>
        )
      );
    }
    return dummyArr;
  };
  return (
    <>
      Technician:
      <select
        name="technicians"
        id="techicians"
        onChange={(e) =>
          setBookingInfo({ ...bookingInfo, worker: e.target.value })
        }
      >
        {renderTechnicians()}
      </select>
    </>
  );
};
