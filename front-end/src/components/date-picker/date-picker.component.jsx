import * as React from "react";
//When receiving error like, cant not resolve... in datepicker, npm i dayjs to fix it
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

export function DatePickerComponent({ setDate }) {
  const [value, setValue] = React.useState(new Date());
  useEffect(() => {
    if (value && value.$d != "Invalid Date") {
      value.$d ? setDate(value.$d) : setDate(value);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
