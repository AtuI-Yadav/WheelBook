import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const StepDateRange = ({ formData, setFormData, error }) => (
  <>
    <Typography variant="h5">Select your booking duration</Typography>
    <DatePicker
      label="Start Date"
      value={formData.startDate}
      onChange={(date) => setFormData({ ...formData, startDate: date })}
      slotProps={{
        textField: { error: !!error.startDate, helperText: error.startDate },
      }}
    />
    <DatePicker
      label="End Date"
      value={formData.endDate}
      onChange={(date) => setFormData({ ...formData, endDate: date })}
      slotProps={{
        textField: { error: !!error.endDate, helperText: error.endDate },
      }}
    />
  </>
);
export default StepDateRange;
