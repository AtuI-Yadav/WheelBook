import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const StepDateRange = ({ formData, setFormData, onSuccess }) => {
  const [inputError, setInputError] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};

    if (!formData.startDate) {
      newError.startDate = "Start date is required field.";
    }
    if (!formData.endDate) {
      console.log("End Date Required");

      newError.endDate = "End date is required field.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      !(formData.endDate > formData.startDate)
    ) {
      newError.endDate = "End date must be after start date";
    }

    setInputError(newError);

    if (Object.keys(newError).length === 0) {
      onSuccess();
    }
  };

  return (
    <>
      <form id="dateRange-form" onSubmit={handleSubmit} />
      <Typography variant="h5">Select your booking duration</Typography>
      <DatePicker
        label="Start Date"
        value={formData.startDate}
        onChange={(date) => {
          handleInputChange("startDate", date);
        }}
        slotProps={{
          textField: {
            error: !!inputError.startDate,
            helperText: inputError.startDate,
          },
        }}
      />
      <DatePicker
        label="End Date"
        value={formData.endDate}
        onChange={(date) => {
          handleInputChange("endDate", date);
        }}
        slotProps={{
          textField: {
            error: !!inputError.endDate,
            helperText: inputError.endDate,
          },
        }}
      />
    </>
  );
};
export default StepDateRange;
