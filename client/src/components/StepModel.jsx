import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { gql, useQuery } from "urql";

const QUERY_VEHICLE_MODEL = gql`
  query VehicleByType($vehicleTypeId: String!) {
    vehicleByType(vehicleTypeId: $vehicleTypeId) {
      id
      isAvailable
      name
      vehicleTypeId
    }
  }
`;

const StepModel = ({ formData, setFormData, onSuccess }) => {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [inputError, setInputError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [vehicleModelResult] = useQuery({
    query: QUERY_VEHICLE_MODEL,
    variables: {
      vehicleTypeId: formData.vehicleType,
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const { data } = vehicleModelResult;
    if (data?.vehicleByType) {
      setVehicleModels(data.vehicleByType);
      setIsLoading(false);
    }
  }, [vehicleModelResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};

    if (!formData.specificModel) {
      newError.specificModel = "Please select Model.";
    }

    setInputError(newError);
    console.log(formData);

    if (Object.keys(newError).length === 0) {
      onSuccess();
    }
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
      <Typography variant="h5">Select a specific model</Typography>
      <form id="vehicleModal-form" onSubmit={handleSubmit}></form>
      <RadioGroup
        value={formData.specificModel}
        onChange={(e) =>
          setFormData({ ...formData, specificModel: e.target.value })
        }
        name="specificModel"
      >
        {vehicleModels.map((model) => (
          <FormControlLabel
            key={model.id}
            value={model.id}
            control={<Radio />}
            label={model.name}
          />
        ))}
      </RadioGroup>
      {inputError.specificModel && (
        <FormHelperText error>{inputError.specificModel}</FormHelperText>
      )}
    </>
  );
};

export default StepModel;
