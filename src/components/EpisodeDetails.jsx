import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

const EpisodeDetails = () => {
  const { episodeId } = useParams();
  const [selectedEpisode] = useOutletContext();
  console.log(selectedEpisode);
  return (
    <div>
      <h2>{selectedEpisode.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: selectedEpisode.description }}></p>
      <audio controls>
        <source src="" type="audio/mp3" />
      </audio>
    </div>
  );
};

export default EpisodeDetails;
