import React, { useState } from "react";
import StepName from "./StepName";
import StepWheels from "./StepWheels";
import StepModel from "./StepModel";
import StepDateRange from "./StepDateRange";
import { Button } from "@mui/material";
import "../Form.css";
import StepSuccess from "./StepSuccess";

const stepsCmpKeys = [
  "name-form",
  "wheels-form",
  "vehicleModal-form",
  "dateRange-form",
  "stepSuccess-form",
];

const StepForm = () => {
  const [activeStep, setActiveStep] = useState("dateRange-form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    specificModel: "",
    startDate: null,
    endDate: null,
    bookingId: "",
  });

  const handleNextClick = () => {
    const currentIndex = stepsCmpKeys.indexOf(activeStep);
    if (currentIndex < stepsCmpKeys.length - 1) {
      setActiveStep(stepsCmpKeys[currentIndex + 1]);
    }
  };

  const handleBackClick = () => {
    const currentIndex = stepsCmpKeys.indexOf(activeStep);
    if (currentIndex > 0) {
      setActiveStep(stepsCmpKeys[currentIndex - 1]);
    }
  };

  const stepsComponent = [
    {
      key: "name-form",
      component: (
        <StepName
          key="name-form"
          formData={formData}
          setFormData={setFormData}
          onSuccess={handleNextClick}
        />
      ),
    },
    {
      key: "wheels-form",
      component: (
        <StepWheels
          formData={formData}
          setFormData={setFormData}
          onSuccess={handleNextClick}
        />
      ),
    },
    {
      key: "vehicleModal-form",
      component: (
        <StepModel
          formData={formData}
          setFormData={setFormData}
          onSuccess={handleNextClick}
        />
      ),
    },
    {
      key: "dateRange-form",
      component: (
        <StepDateRange
          formData={formData}
          setFormData={setFormData}
          onSuccess={handleNextClick}
        />
      ),
    },
    {
      key: "stepSuccess-form",
      component: <StepSuccess formData={formData} />,
    },
  ];

  return (
    <div className="form-container">
      {stepsComponent.map((step) => {
        if (step.key === activeStep) {
          return step.component;
        }
      })}

      <div
        className="button-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          gap: "16px",
        }}
      >
        {activeStep != "stepSuccess-form" && (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackClick}
              disabled={activeStep === "name-form"}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              form={activeStep}
            >
              {activeStep === "dateRange-form" ? "Submit" : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StepForm;
