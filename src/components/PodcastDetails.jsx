import React, { useEffect, useState, useContext } from "react";
import { Outlet, useParams, useOutlet } from "react-router-dom";
import podcastsService from "../services/podcastsService";
import localStorageService from "../services/localStorageService";
import { AppContext } from "../App";
import { Box, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import EpisodesTable from "./EpisodesTable";

const PodcastDetails = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState({});
  const { setLoading } = useContext(AppContext);

  const outlet = useOutlet();

  const getData = async () => {
    setLoading(true);
    const value = localStorageService.getKey(`p-${podcastId}`);
    if (value) {
      setPodcast(value);
    } else {
      const podcastData = await podcastsService.getPodcast(podcastId);
      setPodcast(podcastData);
      localStorageService.setKey(`p-${podcastId}`, podcastData);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box display="grid" gridTemplateColumns="2fr 5fr" gap={14}>
      <Box
        className="podcast-detail-left"
        sx={{ boxShadow: 2, height: "fit-content" }}
        alignContent="center"
        textAlign="center"
      >
        <Box sx={{ my: 3 }}>
          <img src={podcast["artworkUrl600"]} />
        </Box>

        <Divider sx={{ mx: 1 }} />
        <Box sx={{ my: 3, mx: 2 }} className="podcast-name" textAlign={"left"}>
          <strong>{podcast["collectionName"]}</strong>
          <div>
            <span>by </span>
            <span>{podcast["artistName"]}</span>
          </div>
        </Box>
        <Divider sx={{ mx: 1 }} />
        <Box sx={{ my: 3, mx: 1 }} className="podcast-description">
          <strong>Description:</strong>
          <Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
            {podcast.podcastDetails?.["description"]}
          </Typography>
        </Box>
      </Box>
      <Box className="podcast-detail-right">
        {outlet ? (
          <Outlet />
        ) : (
          <>
            <Box sx={{ boxShadow: 2, py: 1, px: 2 }}>
              <Typography
                sx={{ my: 1 }}
                variant="h5"
                color="text.secondary"
                fontWeight={"bold"}
              >
                Episodes: {podcast.podcastDetails?.item.length}
              </Typography>
            </Box>

            <EpisodesTable episodeList={podcast.podcastDetails?.item} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default PodcastDetails;
