import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { AppContext } from "../App";
import EpisodesTable from "./EpisodesTable";

const PodcastDetails = ({ podcast }) => {
  const { loading } = useContext(AppContext);

  return (
    <>
      <Box sx={{ boxShadow: 2, py: 1, px: 2 }}>
        {loading ? (
          <>
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} />
            <Skeleton variant="text" sx={{ height: 12, my: 1 }} />
          </>
        ) : (
          <Typography sx={{ my: 1 }} variant="h5" fontWeight={"bold"}>
            Episodes: {podcast.episodes?.length}
          </Typography>
        )}
      </Box>

      {loading ? (
        <>
          <Skeleton variant="text" sx={{ mt: 2, mb: 1 }} />
          <Skeleton variant="text" sx={{ my: 1 }} />
          <Skeleton variant="text" sx={{ my: 1 }} />
          <Skeleton variant="text" sx={{ my: 1 }} />
          <Skeleton variant="text" sx={{ my: 1 }} />
        </>
      ) : (
        <EpisodesTable episodeList={podcast.episodes} />
      )}
    </>
  );
};

export default PodcastDetails;
