import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const StepVehicleType = ({ formData, setFormData, error }) => {
  // Hardcoded vehicle types based on the number of wheels
  const vehicleOptions = {
    2: ["Bike", "Scooter", "Motorcycle"],
    4: ["Car", "SUV", "Truck"],
  };

  return (
    <>
      <Typography variant="h5">Select a vehicle type</Typography>
      <FormControl component="fieldset" error={!!error.vehicleType}>
        <RadioGroup
          value={formData.vehicleType}
          onChange={(e) =>
            setFormData({ ...formData, vehicleType: e.target.value })
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
          <FormHelperText error>{error.vehicleType}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default StepVehicleType;
