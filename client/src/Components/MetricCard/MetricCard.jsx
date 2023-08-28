// // src/components/MetricCard.js
// import React from 'react';

// const MetricCard = ({ title, value, unit }) => {
//   return (
//     <div className="metric-card">
//       <h3>{title}</h3>
//       <p>{value !== null ? `${value.toFixed(2)} ${unit}` : 'Loading...'}</p>
//     </div>
//   );
// };

// export default MetricCard;
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './MetricCard.css'; // Import your custom CSS

const MetricCard = ({title,value}) => {
  const options = {
    chart: {
      type: 'radialBar',
      height: 350,
      offsetX: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        hollow: {
          size: '70%',
        },
        track: {
          background: '#e0e0e0',
          strokeWidth: '97%',
          margin: 5,
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            offsetY: 100,
          },
          value: {
            offsetY: 30,
            fontSize: '22px',
            formatter: function (val) {
              return val + '%';
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [''],
  };
  const series = [value];

  return (
    <div className="chart-container">
      <p className='title'>{title}</p>
      <hr/>
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default MetricCard;
