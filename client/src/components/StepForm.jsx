import React, { useState } from "react";
import StepName from "./StepName";
import StepWheels from "./StepWheels";
import StepModel from "./StepModel";
import StepDateRange from "./StepDateRange";
import { Button } from "@mui/material";
import "../Form.css";
import StepVehicleType from "./StepVehicleType";
import StepRadioForm from "./StepRadioForm";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    specificModel: "",
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState({});

  const validateStep = () => {
    let newError = {};
    if (step === 1) {
      if (!formData.firstName.trim()) {
        newError.firstName = "First name is required";
      } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName.trim())) {
        newError.firstName = "First name must be at least 2 letters (A-Z)";
      }

      if (!formData.lastName.trim()) {
        newError.lastName = "Last name is required";
      } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName.trim())) {
        newError.lastName = "Last name must be at least 2 letters (A-Z)";
      }
    } else if (step === 2) {
      if (!formData.wheels)
        newError.wheels = "Please select the number of wheels";
    } else if (step === 3) {
      if (!formData.vehicleType)
        newError.vehicleType = "Please select a vehicle type";
    } else if (step === 4) {
      if (!formData.specificModel)
        newError.specificModel = "Please select a model";
    } else if (step === 5) {
      if (!formData.startDate) newError.startDate = "Start date is required";
      if (!formData.endDate) newError.endDate = "End date is required";
      if (
        formData.startDate &&
        formData.endDate &&
        formData.endDate < formData.startDate
      ) {
        newError.endDate = "End date must be after start date";
      }
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
    console.log(formData);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    <StepName formData={formData} setFormData={setFormData} error={error} />,
    <StepRadioForm
      formData={formData}
      setFormData={setFormData}
      error={error}
      currentStep="wheels"
    />,
    <StepRadioForm
      formData={formData}
      setFormData={setFormData}
      error={error}
      currentStep="vehicleType"
    />,
    <StepRadioForm
      formData={formData}
      setFormData={setFormData}
      error={error}
      currentStep="specificModel"
    />,
    // <StepWheels formData={formData} setFormData={setFormData} error={error} />,
    // <StepVehicleType
    //   formData={formData}
    //   setFormData={setFormData}
    //   error={error}
    // />,
    // <StepModel formData={formData} setFormData={setFormData} error={error} />,
    <StepDateRange
      formData={formData}
      setFormData={setFormData}
      error={error}
    />,
  ];

  return (
    <div className="form-container">
      {steps[step - 1]}
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
          {step === steps.length ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default StepForm;
