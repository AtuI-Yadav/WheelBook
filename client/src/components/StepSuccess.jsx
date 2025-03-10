import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { gql, useQuery } from "urql";
import dayjs from "dayjs";

const QUERY_BOOKING_DETAILS = gql`
  query Booking($bookingId: String!) {
    booking(id: $bookingId) {
      id
      startDate
      endDate
      user {
        id
        firstName
        lastName
      }
      vehicle {
        id
        isAvailable
        name
        vehicleTypeId
      }
    }
  }
`;

const StepSuccess = ({ formData }) => {
  const [bookDetails, setBookingDetails] = useState({
    firstName: "Loading...",
    lastName: "Loading...",
    specificModel: "Loading...",
    startDate: "Loading...",
    endDate: "Loading...",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [bookingDetails] = useQuery({
    query: QUERY_BOOKING_DETAILS,
    variables: {
      bookingId: formData?.bookingId,
    },
  });

  const { data, fetching, error } = bookingDetails;
  useEffect(() => {
    if (!fetching) {
      setIsLoading(false);
    }
    if (data?.booking) {
      setBookingDetails({
        firstName: data?.booking?.user?.firstName,
        lastName: data?.booking?.user?.lastName,
        specificModel: data?.booking?.vehicle?.name,
        startDate: dayjs(data?.booking?.startDate).format("MM-DD-YYYY"),
        endDate: dayjs(data?.booking?.endDate).format("MM-DD-YYYY"),
      });
    }
  }, [data?.booking, fetching]);

  useEffect(() => {
    console.log(formData?.bookingId);
  });

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
      {error && <Typography variant="h5">Error Occured!</Typography>}
      {data && (
        <>
          <Typography variant="h5">Sucesfully Booked!</Typography>
          <Typography variant="subtitle1">
            First Name : {bookDetails.firstName}
          </Typography>
          <Typography variant="subtitle1">
            Last Name : {bookDetails.lastName}
          </Typography>
          <Typography variant="subtitle1">
            Vehicle Model : {bookDetails.specificModel}
          </Typography>
          <Typography variant="subtitle1">
            Start Date (MM-DD-YYYY) : {bookDetails.startDate}
          </Typography>
          <Typography variant="subtitle1">
            End Date (MM-DD-YYYY) : {bookDetails.endDate}
          </Typography>
        </>
      )}
    </>
  );
};

export default StepSuccess;
