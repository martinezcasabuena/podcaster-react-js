import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import podcastsService from "../services/podcastsService";
import EpisodeRow from "./EpisodeRow";

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState({});

  const getData = async () => {
    const podcastData = await podcastsService.getPodcast(podcastId);
    setPodcast(podcastData);
    console.log(podcastData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="podcast-detail-container">
      <div>Podcast detail {podcastId}</div>
      <div className="podcast-detail-left">
        <img src={podcast["artworkUrl600"]}></img>
        <div className="podcast-name">
          <strong>{podcast["collectionName"]}</strong>
          <div>
            <span>by </span>
            <span>{podcast["artistName"]}</span>
          </div>
        </div>
        <div className="podcast-description">
          <label>Description:</label>
          <p>{podcast.podcastDetails?.["description"]}</p>
        </div>
      </div>
      <div className="podcast-detail-right">
        <h2 className="episodes-count">
          Episodes: {podcast.podcastDetails?.item.length}
        </h2>
        <div className="episodes-list">
          <div className="episode-row header">
            <div className="episode-title column">Title</div>
            <div className="episode-date column">Date</div>
            <div className="episode-duration column">Duration</div>
          </div>
          {podcast.podcastDetails?.item.map((episode, i) => (
            <EpisodeRow key={i} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
