import { TextField, Typography } from "@mui/material";

const StepName = ({ formData, setFormData, error }) => (
  <>
    <Typography variant="h5">What is your name?</Typography>
    <TextField
      fullWidth
      label="First Name"
      value={formData.firstName}
      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      error={!!error.firstName}
      helperText={error.firstName}
    />
    <TextField
      fullWidth
      label="Last Name"
      value={formData.lastName}
      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      error={!!error.lastName}
      helperText={error.lastName}
    />
  </>
);
export default StepName;
