import { FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";

const StepName = ({ formData, setFormData, onSuccess }) => {
  const [inputError, setInputError] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let newError = {};

    switch (e.target.name) {
      case "firstName":
        if (e.target.required && !e.target.value.trim()) {
          newError[e.target.name] = `First Name is required.`;
        }
        break;
      default:
        break;
    }
    setInputError(newError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};
    if (!formData.firstName.trim()) {
      newError.firstName = "First name is required";
    }
    setInputError(newError);
    if (Object.keys(newError).length === 0) {
      onSuccess();
    }
  };

  return (
    <>
      <Typography variant="h5">What is your name?</Typography>
      <form id="name-form" onSubmit={handleSubmit} />
      <TextField
        name="firstName"
        fullWidth
        label="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        error={!!inputError.firstName}
        helperText={inputError.firstName}
        required
      />
      <TextField
        name="lastName"
        fullWidth
        label="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        error={!!inputError.lastName}
        helperText={inputError.lastName}
      />
    </>
  );
};
export default StepName;
