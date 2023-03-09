import React, { useEffect, useState, useContext } from "react";
import { Outlet, useParams, useOutlet } from "react-router-dom";
import { Box } from "@mui/material";
import { AppContext } from "../App";
import podcastsService from "../services/podcastsService";
import localStorageService from "../services/localStorageService";
import PodcastInfo from "../components/PodcastInfo";
import PodcastDetails from "../components/PodcastDetails";
import Error from "./Error";

const Podcast = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState({});
  const { setLoading, setError, error } = useContext(AppContext);

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
      } else {
        setError(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setError(false);
    getData();
  }, []);

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <Box display="grid" gridTemplateColumns="2fr 5fr" gap={14}>
          <Box
            className="podcast-detail-left"
            sx={{ boxShadow: 2, height: "fit-content" }}
            alignContent="center"
            textAlign="center"
          >
            <PodcastInfo podcast={podcast} />
          </Box>
          {/* The <Outlet> component it's used to load the component that contains the nested route, in this case <EpisodeDetails> */}
          <Box>
            {outlet ? <Outlet /> : <PodcastDetails podcast={podcast} />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Podcast;
