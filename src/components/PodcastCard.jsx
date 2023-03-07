import React from "react";
import { Link } from "react-router-dom";

const PodcastCard = ({ data }) => {
  return (
    <div className="podcast-card-container">
      <Link to={`/podcast/${data["id"]["attributes"]["im:id"]}`}>
        <img src={data["im:image"][2].label}></img>
        <div>{data.title.label}</div>
        <div>Author: {data["im:artist"].label}</div>
      </Link>
    </div>
  );
};

export default PodcastCard;
