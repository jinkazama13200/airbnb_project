import React from "react";
import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export default function DatePicker() {
  const today = new Date().toISOString().split("T")[0];
  return (
    <CustomTextField
      type="date"
      variant="standard"
      InputProps={{
        inputProps: {
          min: today,
        },
      }}
    />
  );
}
