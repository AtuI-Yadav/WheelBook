import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText,
} from "@mui/material";

const StepWheels = ({ formData, setFormData, error }) => (
  <>
    <Typography variant="h5">Number of wheels?</Typography>
    <RadioGroup
      value={formData.wheels}
      onChange={(e) => setFormData({ ...formData, wheels: e.target.value })}
    >
      <FormControlLabel value="2" control={<Radio />} label="2" />
      <FormControlLabel value="4" control={<Radio />} label="4" />
    </RadioGroup>
    {error.wheels && <FormHelperText error>{error.wheels}</FormHelperText>}
  </>
);
export default StepWheels;
