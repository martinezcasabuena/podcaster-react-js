import React, { useState, useEffect } from "react";
import localStorageService from "../services/localStorageService";
import podcastsService from "../services/podcastsService";
import PodcastCard from "../components/PodcastCard";
import { Grid } from "@mui/material";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  const [podcastList, setPodcastList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      setFilteredList(
        podcastList.filter((podcast) => {
          return (
            podcast.title.toLowerCase().includes(searchText.toLowerCase()) ||
            podcast.artist.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      );
    } else {
      setFilteredList(podcastList);
    }
  }, [searchText]);

  const handleChange = (e) => {
    e.preventDefault();
    setsearchText(e.target.value);
  };

  const getData = async () => {
    const value = localStorageService.getKey("podcasts-lst");
    if (value) {
      setPodcastList(value);
      setFilteredList(value);
    } else {
      const podcasts = await podcastsService.getAll();
      setPodcastList(podcasts);
      setFilteredList(podcasts);
      localStorageService.setKey("podcasts-lst", podcasts);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        textAlign={"right"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1rem",
          mb: 2,
        }}
      >
        <Typography
          fontWeight={"bold"}
          color={"#ffff"}
          sx={{ background: "#227cc7" }}
          borderRadius={2}
          fontSize="large"
          width={"3rem"}
          textAlign={"center"}
        >
          {filteredList.length}
        </Typography>
        <Input
          type="text"
          placeholder="Filter podcasts..."
          className="searchinput"
          onChange={handleChange}
          value={searchText}
          sx={{ width: "30%" }}
        />
      </Box>
      <Grid
        container
        spacing={4}
        className="podcast-list-container"
        columns={4}
      >
        {filteredList.map((podcast, i) => (
          <PodcastCard key={i} data={podcast} />
        ))}
      </Grid>
    </>
  );
};

export default Home;
