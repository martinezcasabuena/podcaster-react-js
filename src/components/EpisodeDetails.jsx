import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import localStorageService from "../services/localStorageService";
import { AppContext } from "../App";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const [episodeInfo, setEpisodeInfo] = useState({});
  const { loading } = useContext(AppContext);

  useEffect(() => {
    const value = localStorageService.getKey(`p-${podcastId}`);
    if (value) {
      const episodeItem = value.episodes.find((x) => x.id == episodeId);
      if (episodeItem) {
        setEpisodeInfo(episodeItem);
      }
    }
  }, [loading]);

  return (
    <Box sx={{ boxShadow: 2, py: 1, px: 2 }}>
      <Typography sx={{ my: 1 }} variant="h5" fontWeight={"bold"}>
        {episodeInfo.title}
      </Typography>
      <Typography
        variant="p"
        fontStyle={"italic"}
        dangerouslySetInnerHTML={{
          __html: episodeInfo.description,
        }}
      />
      <Divider sx={{ my: 4 }} />

      {episodeInfo.audioURL && (
        <audio controls className="audio-reproducer">
          <source src={episodeInfo.audioURL} type={episodeInfo.audioType} />
        </audio>
      )}
    </Box>
  );
};

export default EpisodeDetails;
