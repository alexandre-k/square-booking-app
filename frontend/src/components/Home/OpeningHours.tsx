import { Period } from "types/Location";
import { formatTime, formatDayOfWeek } from "utils/dateTime";

interface OpeningHoursProps {
  periods: Array<Period>;
}
const OpeningHours = ({ periods }: OpeningHoursProps) => (
  <table style={{ minWidth: "250px", textAlign: "left" }}>
    <thead>
      <tr>
        <th>Day of week</th>
        <th>Hours</th>
      </tr>
    </thead>
    <tbody>
      {periods.map((period) => {
        return (
          <tr key={period.day_of_week}>
            <td>{formatDayOfWeek(period.day_of_week)} </td>
            <td>
              {formatTime(period.start_local_time)} -
              {formatTime(period.end_local_time)}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default OpeningHours;
