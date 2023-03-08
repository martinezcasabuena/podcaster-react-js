import React, { useState, useEffect } from "react";
import localStorageService from "../services/localStorageService";
import podcastsService from "../services/podcastsService";
import PodcastCard from "./PodcastCard";
import { Grid } from "@mui/material";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";

const Home = () => {
  const [podcastList, setPodcastList] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (searchText) {
      setFilteredList(
        podcastList.filter((podcast) => {
          return podcast.title.label
            .toLowerCase()
            .includes(
              searchText.toLowerCase() ||
                podcast["im:artist"].label
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
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
      <Box textAlign={"right"} sx={{ display: "inline" }}>
        <div className="counter">{filteredList.length}</div>
        <Input
          type="text"
          placeholder="Filter podcasts..."
          className="searchinput"
          onChange={handleChange}
          value={searchText}
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
