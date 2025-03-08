import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText,
} from "@mui/material";

const StepModel = ({ formData, setFormData, error }) => {
  // Hardcoded models based on vehicle type
  const modelOptions = {
    Bike: ["Bike Model 1", "Bike Model 2", "Bike Model 3"],
    Scooter: ["Scooter Model 1", "Scooter Model 2"],
    Motorcycle: ["Motorcycle Model 1", "Motorcycle Model 2"],
    Car: ["Car Model A", "Car Model B", "Car Model C"],
    SUV: ["SUV Model X", "SUV Model Y"],
    Truck: ["Truck Model M", "Truck Model N"],
  };

  return (
    <>
      <Typography variant="h5">Select a specific model</Typography>
      <RadioGroup
        value={formData.specificModel}
        onChange={(e) =>
          setFormData({ ...formData, specificModel: e.target.value })
        }
      >
        {/* Display models based on selected vehicle type */}
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
        <FormHelperText error>{error.specificModel}</FormHelperText>
      )}
    </>
  );
};

export default StepModel;
