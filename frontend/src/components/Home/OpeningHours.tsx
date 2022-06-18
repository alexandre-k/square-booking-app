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
          <tr key={period.dayOfWeek}>
            <td>{formatDayOfWeek(period.dayOfWeek)} </td>
            <td>
              {formatTime(period.startLocalTime)} -
              {formatTime(period.endLocalTime)}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default OpeningHours;
