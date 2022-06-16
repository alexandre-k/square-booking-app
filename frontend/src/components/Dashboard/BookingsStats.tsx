import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
    /* ResponsiveContainer, */
} from "recharts";

interface BookingsStatsProps {
  appointmentsByDate: Array<object>;
}

const BookingsStats = (props: BookingsStatsProps) => {
  return (
    <>
      <h2>Appointments per month</h2>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart
          width={400}
          height={300}
          data={props.appointmentsByDate}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="appointments" fill="#82ca9d" />
        </BarChart>
        {/* </ResponsiveContainer> */}
    </>
  );
};

export default BookingsStats;
