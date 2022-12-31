import React, { useState } from "react";
//When receiving error like, cant not resolve... in datepicker, npm i dayjs to fix it
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

export function BookingDatePickerComponent({ setBookingInfo, bookingInfo }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (bookingInfo.date && bookingInfo.date.length > 0) {
      setValue(bookingInfo.date);
    } else {
      setValue(new Date());
    }
  }, [bookingInfo]);
  return (
    <>
      Date:
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            if (newValue && newValue.$d != "Invalid Date") {
              newValue.$d
                ? setBookingInfo({
                    ...bookingInfo,
                    date: newValue.$d.toDateString(),
                  })
                : setBookingInfo({
                    ...bookingInfo,
                    date: newValue.toDateString(),
                  });
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
}
