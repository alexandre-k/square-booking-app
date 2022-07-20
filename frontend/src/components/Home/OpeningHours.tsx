import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Period } from "types/Location";
import { getToday, formatTime, formatDayOfWeek } from "utils/dateTime";

interface OpeningHoursProps {
  periods: Array<Period>;
}
const OpeningHours = ({ periods }: OpeningHoursProps) => (
    <Table sx={{ minWidth: "250px", textAlign: "left" }} aria-label="openingHours">
    <TableHead>
    <TableRow>
    <TableCell>Day of Week</TableCell>
    <TableCell>Hours</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
      {periods.map((period) => {
        const isToday = getToday() === formatDayOfWeek(period.dayOfWeek)
        return (
        <TableRow style={{ backgroundColor: isToday ? "#e5ffff" : "" }} key={period.dayOfWeek}>
            <TableCell>{formatDayOfWeek(period.dayOfWeek)} </TableCell>
            <TableCell>
              {formatTime(period.startLocalTime)} -
              {formatTime(period.endLocalTime)}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
    </Table>
);

export default OpeningHours;
