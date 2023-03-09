import React, { useEffect, useState, useContext } from "react";
import { Outlet, useParams, useOutlet } from "react-router-dom";
import { AppContext } from "../App";
import { Box } from "@mui/material";
import podcastsService from "../services/podcastsService";
import localStorageService from "../services/localStorageService";
import PodcastInfo from "../components/PodcastInfo";
import PodcastDetails from "../components/PodcastDetails";

const Podcast = () => {
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
      if (podcastData) {
        setPodcast(podcastData);
        localStorageService.setKey(`p-${podcastId}`, podcastData);
      }
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
        <PodcastInfo podcast={podcast} />
      </Box>

      <Box>{outlet ? <Outlet /> : <PodcastDetails podcast={podcast} />}</Box>
    </Box>
  );
};

export default Podcast;
