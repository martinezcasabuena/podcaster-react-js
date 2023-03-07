import React from "react";

const PodcastCard = ({ data }) => {
  return (
    <div className="podcast-card-container">
      <img src={data["im:image"][2].label}></img>
      <div>{data.title.label}</div>
      <div>Author: {data["im:artist"].label}</div>
    </div>
  );
};

export default PodcastCard;
