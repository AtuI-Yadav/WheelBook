import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const StepRadioForm = ({ formData, setFormData, currentStep, error }) => {
  // Define step-wise configurations
  const stepConfig = {
    wheels: {
      label: "Number of wheels?",
      options: ["2", "4"],
      value: formData.wheels,
      key: "wheels",
    },
    vehicleType: {
      label: "Select a vehicle type",
      options:
        formData.wheels === "2"
          ? ["Bike", "Scooter", "Motorcycle"]
          : ["Car", "SUV", "Truck"],
      value: formData.vehicleType,
      key: "vehicleType",
    },
    specificModel: {
      label: "Select a specific model",
      options:
        {
          Bike: ["Bike Model 1", "Bike Model 2"],
          Scooter: ["Scooter Model 1", "Scooter Model 2"],
          Motorcycle: ["Motorcycle Model 1", "Motorcycle Model 2"],
          Car: ["Car Model A", "Car Model B"],
          SUV: ["SUV Model X", "SUV Model Y"],
          Truck: ["Truck Model M", "Truck Model N"],
        }[formData.vehicleType] || [],
      value: formData.specificModel,
      key: "specificModel",
    },
  };

  const step = stepConfig[currentStep];

  return (
    <>
      <Typography variant="h5">{step.label}</Typography>
      <FormControl component="fieldset" error={!!error[step.key]}>
        <RadioGroup
          value={step.value}
          onChange={(e) =>
            setFormData({ ...formData, [step.key]: e.target.value })
          }
        >
          {step.options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
        {error[step.key] && <FormHelperText>{error[step.key]}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default StepRadioForm;
