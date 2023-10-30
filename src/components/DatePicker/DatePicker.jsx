import React from "react";
import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
  }
`;

export default function DatePicker() {
  const today = new Date().toISOString().split("T")[0];
  return (
    <CustomTextField
      type="date"
      variant="outlined"
      InputProps={{
        inputProps: {
          min: today,
        },
      }}
    />
  );
}
