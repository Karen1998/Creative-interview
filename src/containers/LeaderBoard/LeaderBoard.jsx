import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { format } from "date-fns";

const LeaderBoard = ({ leaderBoard }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaderBoard.map((ld) => (
            <TableRow key={ld.name}>
              <TableCell component="th" scope="row">
                {ld.name}
              </TableCell>
              <TableCell align="right">{format(ld.time, "mm:ss")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LeaderBoard.propTypes = {
  leaderBoard: PropTypes.array,
};

export default LeaderBoard;
