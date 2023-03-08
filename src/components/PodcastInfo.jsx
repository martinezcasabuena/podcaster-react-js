import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";

const PodcastInfo = ({ podcast }) => {
  return (
    <Link to={`/podcast/${podcast.id}`}>
      <Box sx={{ my: 3 }}>
        <img src={podcast.image} />
      </Box>

      <Divider sx={{ mx: 1 }} />
      <Box sx={{ my: 3, mx: 2 }} className="podcast-name" textAlign={"left"}>
        <strong>{podcast.title}</strong>
        <div>
          <span>by </span>
          <span>{podcast.artist}</span>
        </div>
      </Box>
      <Divider sx={{ mx: 1 }} />
      <Box sx={{ my: 3, mx: 1 }} className="podcast-description">
        <strong>Description:</strong>
        <Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
          {podcast["description"]}
        </Typography>
      </Box>
    </Link>
  );
};

export default PodcastInfo;
