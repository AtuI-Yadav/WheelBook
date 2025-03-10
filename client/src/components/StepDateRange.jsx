import { Box, CircularProgress, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { gql, useMutation } from "urql";

const MUTATION_CREATE_BOOKING = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      startDate
      endDate
    }
  }
`;

const StepDateRange = ({ formData, setFormData, onSuccess }) => {
  const [inputError, setInputError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [, createBooking] = useMutation(MUTATION_CREATE_BOOKING);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let newError = {};

    if (!formData.startDate) {
      newError.startDate = "Start date is required field.";
    }
    if (!formData.endDate) {
      console.log("End Date Required");

      newError.endDate = "End date is required field.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      !(formData.endDate > formData.startDate)
    ) {
      newError.endDate = "End date must be after start date";
    }

    setInputError(newError);

    if (!(Object.keys(newError).length === 0)) {
      setIsLoading(false);
      return;
    }

    const { data } = await createBooking({
      createBookingInput: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        vehicleId: formData.specificModel,
      },
    });

    if (data) {
      console.log(data?.createBooking?.id);

      handleInputChange("bookingId", data?.createBooking?.id || "");
      setIsLoading(false);
      onSuccess();
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <form id="dateRange-form" onSubmit={handleSubmit} />
      <Typography variant="h5">Select your booking duration</Typography>
      <DatePicker
        label="Start Date"
        value={formData.startDate}
        onChange={(date) => {
          handleInputChange("startDate", date);
        }}
        slotProps={{
          textField: {
            error: !!inputError.startDate,
            helperText: inputError.startDate,
          },
        }}
      />
      <DatePicker
        label="End Date"
        value={formData.endDate}
        onChange={(date) => {
          handleInputChange("endDate", date);
        }}
        slotProps={{
          textField: {
            error: !!inputError.endDate,
            helperText: inputError.endDate,
          },
        }}
      />
    </>
  );
};
export default StepDateRange;
