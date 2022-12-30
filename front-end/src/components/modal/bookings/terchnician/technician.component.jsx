import React, { useEffect } from "react";

export const TechnicianSection = ({
  allTechnicians,
  bookingInfo,
  setBookingInfo,
}) => {
  useEffect(() => {
    if (allTechnicians.length > 0) {
      const admin =
        allTechnicians && allTechnicians.find((el) => el.role === "admin")._id;
      setBookingInfo({ ...bookingInfo, worker: admin });
    }
  }, [allTechnicians]);
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
