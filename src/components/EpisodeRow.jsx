import React from "react";
import { Link } from "react-router-dom";
import secondsToTime from "../utils/SecondsToTime";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const EpisodeRow = ({ episode }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <Link className="episode-title column" to={`episode/${episode.id}`}>
          {episode.title}
        </Link>
      </TableCell>
      <TableCell align="center">
        {new Date(episode.date).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">
        {isNaN(episode.duration)
          ? episode.duration
          : secondsToTime(episode.duration)}
      </TableCell>
    </TableRow>
  );
};

export default EpisodeRow;
