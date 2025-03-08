import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import "../Form.css";

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    specificModel: "", // Added state for specific model
    startDate: null, // Added state for start date
    endDate: null, // Added state for end date
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    specificModel: "",
    startDate: "",
    endDate: "",
  });

  const vehicleOptions = {
    2: ["Bike", "Scooter", "Moped"],
    4: ["Car", "SUV", "Truck"],
  };

  const modelOptions = {
    Bike: ["Yamaha R15", "KTM Duke 200", "Honda CBR"],
    Scooter: ["Honda Activa", "Suzuki Access", "TVS Jupiter"],
    Moped: ["TVS XL100", "Hero Puch", "Bajaj M80"],
    Car: ["Maruti Swift", "Hyundai i20", "Honda City"],
    SUV: ["Mahindra XUV700", "Toyota Fortuner", "Tata Harrier"],
    Truck: ["Tata 407", "Ashok Leyland Dost", "Eicher Pro"],
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      let updatedData = { ...prev, [field]: value };

      if (field === "wheels") {
        updatedData.vehicleType = "";
        updatedData.specificModel = "";
      }
      if (field === "vehicleType") {
        updatedData.specificModel = "";
      }
      return updatedData;
    });
    setError({
      ...error,
      [field]: value ? "" : `Please select ${field.replace(/([A-Z])/g, " $1")}`,
    });
  };

  const handleNext = () => {
    let newErrors = {};
    if (step === 1) {
      newErrors = {
        firstName: formData.firstName ? "" : "Please enter your first name",
        lastName: formData.lastName ? "" : "Please enter your last name",
      };
    } else if (step === 2) {
      newErrors = {
        wheels: formData.wheels ? "" : "Please select number of wheels",
        vehicleType: formData.vehicleType ? "" : "Please select a vehicle type",
      };
    } else if (step === 3) {
      newErrors = {
        specificModel: formData.specificModel
          ? ""
          : "Please select a specific model",
      };
    } else if (step === 4) {
      newErrors = {
        startDate: formData.startDate ? "" : "Please select a start date",
        endDate: formData.endDate ? "" : "Please select an end date",
      };
    }
    setError(newErrors);
    if (Object.values(newErrors).every((err) => err === "")) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="form-container">
      {step === 1 && (
        <>
          <Typography variant="h5" className="question">
            What is your name?
          </Typography>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={!!error.firstName}
            helperText={error.firstName}
          />
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={!!error.lastName}
            helperText={error.lastName}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h5" className="question">
            Number of wheels?
          </Typography>
          <RadioGroup
            value={formData.wheels}
            onChange={(e) => handleInputChange("wheels", e.target.value)}
          >
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
          {error.wheels && (
            <Typography className="error-message">{error.wheels}</Typography>
          )}
          {formData.wheels && (
            <>
              <Typography variant="h5" className="question">
                Select your vehicle type
              </Typography>
              <RadioGroup
                value={formData.vehicleType}
                onChange={(e) =>
                  handleInputChange("vehicleType", e.target.value)
                }
              >
                {vehicleOptions[formData.wheels]?.map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
              {error.vehicleType && (
                <Typography className="error-message">
                  {error.vehicleType}
                </Typography>
              )}
            </>
          )}
        </>
      )}

      {step === 3 && formData.vehicleType && (
        <>
          <Typography variant="h5" className="question">
            Select a specific model
          </Typography>
          <RadioGroup
            value={formData.specificModel}
            onChange={(e) => handleInputChange("specificModel", e.target.value)}
          >
            {modelOptions[formData.vehicleType]?.map((model) => (
              <FormControlLabel
                key={model}
                value={model}
                control={<Radio />}
                label={model}
              />
            ))}
          </RadioGroup>
          {error.specificModel && (
            <Typography className="error-message">
              {error.specificModel}
            </Typography>
          )}
        </>
      )}

      {step === 4 && (
        <>
          <Typography variant="h5">Select your booking duration</Typography>

          {/* Start Date Picker */}
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(date) => handleInputChange("startDate", date)}
            slotProps={{
              textField: {
                error: !!error.startDate,
                helperText: error.startDate,
              },
            }}
          />

          {/* End Date Picker */}
          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(date) => handleInputChange("endDate", date)}
            slotProps={{
              textField: {
                error: !!error.endDate,
                helperText: error.endDate,
              },
            }}
          />
        </>
      )}

      <div
        className="button-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          gap: "16px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Form;
