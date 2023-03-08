import React, { useContext } from "react";
import { AppContext } from "../App";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Header = () => {
  const { loading } = useContext(AppContext);
  return (
    <div>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={"#227cc7"}
        sx={{ mt: 2, mb: 1 }}
      >
        Podcaster
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default Header;
