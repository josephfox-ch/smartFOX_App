import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const LineChart = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineChart;

