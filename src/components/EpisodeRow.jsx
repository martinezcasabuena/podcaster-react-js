import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import secondsToTime from "../utils/SecondsToTime";

const EpisodeRow = ({ episode }) => {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <StyledTableRow>
      <TableCell>
        <Link to={`episode/${episode.id}`}>{episode.title}</Link>
      </TableCell>
      <TableCell align="center">
        {new Date(episode.date).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">
        {isNaN(episode.duration)
          ? episode.duration
          : secondsToTime(episode.duration)}
      </TableCell>
    </StyledTableRow>
  );
};

export default EpisodeRow;
