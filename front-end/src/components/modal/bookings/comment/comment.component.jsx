import React from "react";

export const Comment = ({ bookingInfo, setBookingInfo }) => {
  return (
    <div>
      Comment:
      <textarea
        name="comment"
        id="comment-section"
        cols="40"
        value={bookingInfo.comment}
        rows="10"
        onChange={(e) =>
          setBookingInfo({ ...bookingInfo, comment: e.target.value })
        }
      ></textarea>
    </div>
  );
};
