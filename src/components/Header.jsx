import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "../App";

const Header = () => {
  const { loading, navigationLoading } = useContext(AppContext);
  const isLoading = loading || navigationLoading; //Data is loading or navigation is loading. Only for the spinner element

  return (
    <>
      <Link to={"/"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={"#227cc7"}
            sx={{ mt: 2, mb: 1 }}
          >
            Podcaster
          </Typography>

          <CircularProgress
            sx={{ mr: 1, color: "#227cc7" }}
            size={25}
            className={`${!isLoading ? "fade-out" : ""}`}
          />
        </Box>
      </Link>
      <Divider sx={{ mb: 3 }} />
    </>
  );
};

export default Header;
