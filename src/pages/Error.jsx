import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Error = () => {
  return (
    <Box>
      <Typography sx={{ my: 1 }} variant="h4" textAlign="center">
        Oops, an error has occurred.
      </Typography>
      <Typography sx={{ my: 1 }} variant="h5" textAlign="center">
        Please check the console.
      </Typography>
    </Box>
  );
};

export default Error;
