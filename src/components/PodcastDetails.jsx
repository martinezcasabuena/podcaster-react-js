import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EpisodesTable from "./EpisodesTable";

const PodcastDetails = ({ podcast }) => {
  return (
    <>
      <Box sx={{ boxShadow: 2, py: 1, px: 2 }}>
        <Typography
          sx={{ my: 1 }}
          variant="h5"
          //   color="text.secondary"
          fontWeight={"bold"}
        >
          Episodes: {podcast.episodes?.length}
        </Typography>
      </Box>

      <EpisodesTable episodeList={podcast.episodes} />
    </>
  );
};

export default PodcastDetails;
