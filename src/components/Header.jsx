import React, { useContext } from "react";
import { AppContext } from "../App";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Header = () => {
  const { loading, navigationLoading } = useContext(AppContext);
  const isLoading = loading || navigationLoading;

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
            className={`Spinner ${!isLoading ? "fade-out" : ""}`}
          />
        </Box>
      </Link>
      <Divider sx={{ mb: 2 }} />
    </>
  );
};

export default Header;
