import React from "react";

export const NoteComponent = ({ setBookingInfo, bookingInfo }) => {
  return (
    <div>
      <div className="note-input">
        Note:
        <input
          type="text"
          onChange={(e) =>
            setBookingInfo({ ...bookingInfo, note: e.target.value })
          }
        />
      </div>
    </div>
  );
};
