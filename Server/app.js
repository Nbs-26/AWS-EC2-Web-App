require('dotenv').config(); // Load environment variables from .env file

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userModel =require('./Models/User')
const AWS = require('aws-sdk');

const app=express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3001;
const backendAPIUrl=`http://localhost:${PORT}/`


//Mongo DB Connection & Server running state Check
const mongoURI='mongodb+srv://NbSai:NbSai@cluster0.jtklfpt.mongodb.net/AuthorisedUsersEC2?retryWrites=true&w=majority'
mongoose.connect(mongoURI,
  {useNewUrlParser: true, 
  useUnifiedTopology: true,
  writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000 }})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });


//Register End Point
app.post('/register', async (req, res) => {
  try{
    const newUser=new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      authCode:req.body.authCode
    })
    console.log('New User:', newUser);
    const user=await userModel.insertMany(newUser);
    console.log('Inserted User:', user);
    res.status(200).json(user);
  }
  catch(err){
    console.error('Insertion Error:', err);
    res.status(500).json(err);
  }
});

//Login End point
app.post("/login",async (req,res)=>{
  const email= req.body.email;
  const  password= req.body.password;
  const  authCode= req.body.authCode;
    try {
      // Check if the provided authCode matches the authorized code
      const authorizedUser = await userModel.findOne({ authCode: authCode });
  
      if (!authorizedUser) {
        res.status(401).json("Not an authorized user");
        return;
      }
  
      // If authCode matches, proceed to check email and password
      const user = await userModel.findOne({ email: email });
  
      if (!user) {
        res.status(404).json("User not found");
        return;
      }
  
      if (user.password === password) {
        res.status(200).json("Success");
      } else {
        res.status(401).json("Password is incorrect");
      }
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json(err);
    }
  })


// Set up AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});


// Create CloudWatch instance
const cloudwatch = new AWS.CloudWatch();

//Enter the instance id
const instanceId='i-0bb3e6a49336c5aaa'

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
                    Value: instanceId,
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
                    Value: instanceId,
                  },
                ],
              },
              Period: 300, // 5 minutes
              Stat: 'Average', 
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
                    Value: instanceId,
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
              Stat: 'Average',
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
