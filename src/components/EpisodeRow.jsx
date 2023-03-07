import React from "react";
import { Link } from "react-router-dom";
import secondsToTime from "../utils/SecondsToTime";

const EpisodeRow = ({ episode, setSelectedEpisode }) => {
  return (
    <div className="episode-row">
      <Link
        className="episode-title column"
        to={`episode/${episode["guid"]}`}
        onClick={() => setSelectedEpisode(episode)}
      >
        {episode["title"]}
      </Link>
      <div className="episode-date column">
        {new Date(episode["pubDate"]).toLocaleDateString()}
      </div>
      <div className="episode-duration column">
        {isNaN(episode["itunes:duration"])
          ? episode["itunes:duration"]
          : secondsToTime(episode["itunes:duration"])}
      </div>
    </div>
  );
};

export default EpisodeRow;
