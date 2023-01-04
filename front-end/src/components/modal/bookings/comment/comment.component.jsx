import React from "react";

export const Comment = ({ bookingInfo, setBookingInfo }) => {
  return (
    <div>
      Comment:
      <textarea
        name="comment"
        id="comment-section"
        cols="40"
        rows="10"
        onChange={(e) =>
          setBookingInfo({ ...bookingInfo, comment: e.target.value })
        }
      ></textarea>
    </div>
  );
};
