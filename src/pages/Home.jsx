import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import localStorageService from "../services/localStorageService";
import podcastsService from "../services/podcastsService";
import PodcastCard from "../components/PodcastCard";
import { AppContext } from "../App";
import Error from "./Error";

const Home = () => {
  const [podcastList, setPodcastList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setsearchText] = useState("");
  const { setLoading, setError, error } = useContext(AppContext);

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
    setLoading(true);
    const value = localStorageService.getKey("podcasts-lst"); //Get data from localStorage
    if (value) {
      setPodcastList(value);
      setFilteredList(value);
    } else {
      const podcasts = await podcastsService.getAll(); //Fetch from API
      if (podcasts) {
        setPodcastList(podcasts);
        setFilteredList(podcasts);
        localStorageService.setKey("podcasts-lst", podcasts); //Store in localStorage
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
              {filteredList?.length}
            </Typography>
            <Input
              type="text"
              placeholder="Filter podcasts..."
              onChange={handleChange}
              value={searchText}
              sx={{ width: "30%" }}
            />
          </Box>
          <Grid container spacing={4} columns={4}>
            {filteredList.map((podcast, i) => (
              <PodcastCard key={i} data={podcast} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
