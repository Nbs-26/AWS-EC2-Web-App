// server.js
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config(); // Load environment variables from .env file
const app = express();
app.use(cors());

// Set up AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Create CloudWatch instance
const cloudwatch = new AWS.CloudWatch();

// Define a route to fetch metrics data
app.get('/metrics', async (req, res) => {
  try {
    // Specify parameters for the getMetricData request
    const params = {
        MetricDataQueries: [
          {
            Id: 'cpu',
            MetricStat: {
              Metric: {
                Namespace: 'AWS/EC2',
                MetricName: 'CPUUtilization',
                Dimensions: [
                  {
                    Name: 'InstanceId',
                    Value: 'i-0341f5bd92a3e3a4a',
                  },
                ],
              },
              Period: 300, // 5 minutes
              Stat: 'Average', // Use 'Average' for CPUUtilization
            },
            ReturnData: true,
          },
          {
            Id: 'memory_used',
            MetricStat: {
              Metric: {
                Namespace: 'CWAgent',
                MetricName: 'mem_used_percent',
                Dimensions: [
                  {
                    Name: 'InstanceId',
                    Value: 'i-0341f5bd92a3e3a4a',
                  },
                ],
              },
              Period: 300, // 5 minutes
              Stat: 'Average', // Use 'Sum' for DiskReadBytes
            },
            ReturnData: true,
          },
          {
            Id: 'disk_used',
            MetricStat: {
              Metric: {
                Namespace: 'CWAgent',
                MetricName: 'disk_used_percent',
                Dimensions: [
                  {
                    Name: 'InstanceId',
                    Value: 'i-0341f5bd92a3e3a4a',
                  },
                  {
                    Name: 'device',
                    Value: 'xvda1',
                  },
                  {
                    Name: 'fstype',
                    Value: 'xfs',
                  },
                  {
                    Name: 'path',
                    Value: '/',
                  }
                ],
              },
              Period: 300, // 5 minutes
              Stat: 'Average', // Use 'Sum' for DiskReadBytes
            },
            ReturnData: true,
          }

        ],
        StartTime: new Date(Date.now() - 3600000),
        EndTime: new Date(),
      };
      

    // Fetch metric data using getMetricData
    const data = await cloudwatch.getMetricData(params).promise();
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching metric data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});