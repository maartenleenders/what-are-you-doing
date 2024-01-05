import React from "react";
import { useLogEntriesContext } from "../context/log-entries.context";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";

export const LogEntriesTable = () => {
  const { state } = useLogEntriesContext();

  const sortedEntries = state.entries.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const sortedEntries = state.entries.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEntries.map(({ date, activity }, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {format(date.toString(), "dd-MM-yyyy - HH:mm")}
              </TableCell>
              <TableCell>{activity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
