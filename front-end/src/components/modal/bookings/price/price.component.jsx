import React from "react";

export const Price = ({ setBookingInfo, bookingInfo }) => {
  return (
    <div className="price-section">
      Price:$
      <input
        type="number"
        min="0"
        value={bookingInfo.price}
        onChange={(e) => {
          setBookingInfo({ ...bookingInfo, price: +e.target.value });
        }}
      />
    </div>
  );
};
