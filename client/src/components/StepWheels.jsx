import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { gql, useQuery } from "urql";

const QUERY_VEHICLE_CATEGORY = gql`
  query VehicleTypesByCategory($category: Category!) {
    vehicleTypesByCategory(category: $category) {
      id
      name
      category
    }
  }
`;

const StepWheels = ({ formData, setFormData, onSuccess }) => {
  const [inputError, setInputError] = useState({});
  const [vhclTypeOption, setVhclTypeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};

    if (!formData.wheels) {
      newError.wheels = "Please select Number of Wheels.";
    }
    if (!formData.vehicleType) {
      newError.vehicleType = "Please select Vehicle Type.";
    }
    setInputError(newError);

    if (Object.keys(newError).length === 0) {
      onSuccess();
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "wheels":
        setFormData((prevState) => ({
          ...prevState,
          vehicleType: "",
          specificModel: "",
          wheels: e.target.value,
        }));
        break;

      case "vehicleType":
        setFormData((prevState) => ({
          ...prevState,
          specificModel: "",
          vehicleType: e.target.value,
        }));
        break;
      default:
        break;
    }
  };

  const [vehicleCategoryResult] = useQuery({
    query: QUERY_VEHICLE_CATEGORY,
    variables: {
      category: formData.wheels,
    },
    requestPolicy: "network-only",
    pause: formData.wheels ? false : true,
  });

  useEffect(() => {
    const { data, fetching } = vehicleCategoryResult;
    if (fetching) {
      setIsLoading(true);
    }
    if (data?.vehicleTypesByCategory) {
      console.log(data.vehicleTypesByCategory);
      setVhclTypeOptions(data.vehicleTypesByCategory);
      setIsLoading(false);
    }
  }, [vehicleCategoryResult]);

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
      <form id="wheels-form" onSubmit={handleSubmit} />
      <Typography variant="h5">Number of wheels?</Typography>
      <RadioGroup
        name="wheels"
        value={formData.wheels}
        onChange={handleInputChange}
      >
        <FormControlLabel value="TWO_WHEELER" control={<Radio />} label="2" />
        <FormControlLabel value="FOUR_WHEELER" control={<Radio />} label="4" />
      </RadioGroup>
      {inputError.wheels && (
        <FormHelperText error>{inputError.wheels}</FormHelperText>
      )}

      {formData.wheels && (
        <>
          <Typography variant="h5">Select a vehicle type</Typography>
          <FormControl component="fieldset" error={!!inputError.vehicleType}>
            <RadioGroup
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
            >
              {vhclTypeOption?.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
            {inputError.vehicleType && (
              <FormHelperText error>{inputError.vehicleType}</FormHelperText>
            )}
          </FormControl>
        </>
      )}
    </>
  );
};
export default StepWheels;
