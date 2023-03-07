import React, { useState, useEffect } from "react";
import podcastsService from "../services/podcastsService";
import PodcastCard from "./PodcastCard";

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
    const podcasts = await podcastsService.getAll();
    setPodcastList(podcasts.feed.entry);
    setFilteredList(podcasts.feed.entry);
    console.log(podcasts.feed.entry);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="search-container">
        <div className="counter">{filteredList.length}</div>
        <input
          type="text"
          placeholder="Filter podcasts..."
          className="searchinput"
          onChange={handleChange}
          value={searchText}
        />
      </div>
      <div className="podcast-list-container">
        {filteredList.map((podcast, i) => (
          <PodcastCard key={i} data={podcast} />
        ))}
      </div>
    </>
  );
};

export default Home;
