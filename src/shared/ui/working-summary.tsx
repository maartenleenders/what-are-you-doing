import {
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useLogEntriesContext } from "../context/log-entries.context";

export const WorkingSummary = () => {
  const { state } = useLogEntriesContext();

  const groupedEntries = [...state.entries]
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    })
    .reduce<Record<string, number>>((prev, cur, curIndex, entries) => {
      const old = prev[cur.activity] || 0;
      const next = entries[curIndex + 1];
      const timeSpent = next
        ? next.date.getTime() - cur.date.getTime()
        : new Date().getTime() - cur.date.getTime();

      return {
        ...prev,
        [cur.activity]: old + timeSpent,
      };
    }, {});

  return (
    <>
      <Stack marginBottom={1} direction="row" justifyContent="space-between">
        <Typography variant="h4">Log Summary</Typography>
      </Stack>

      <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Time Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedEntries).map(
              ([activity, timeSpent], index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {activity}
                  </TableCell>
                  <TableCell>{timeSpent / 1000 / 3600} hour</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
