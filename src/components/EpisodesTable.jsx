import React from "react";
import EpisodeRow from "./EpisodeRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";

const EpisodesTable = ({ episodeList }) => {
  return (
    <TableContainer
      component={Box}
      sx={{ boxShadow: 2, my: 3, px: 2, py: 3 }}
      className="episode-table"
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodeList?.map((episode, i) => (
            <EpisodeRow episode={episode} key={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EpisodesTable;
