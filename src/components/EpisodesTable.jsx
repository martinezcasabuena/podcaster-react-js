import React, { useState } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import EpisodeRow from "./EpisodeRow";

const EpisodesTable = ({ episodeList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          {episodeList &&
            (rowsPerPage > 0
              ? episodeList?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : episodeList
            ).map((episode, i) => <EpisodeRow episode={episode} key={i} />)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
              count={episodeList ? episodeList.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default EpisodesTable;
