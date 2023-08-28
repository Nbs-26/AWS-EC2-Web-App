// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard'; // Create this component
import Navbar from '../Navbar/Navbar';
import '../Dashboard/Dashboard.css'

const Dashboard = ({ backendAPIUrl }) => {
const [cpuUsage, setCpuUsage] = useState(null);
const [memoryUsage,setMemoryUsage]=useState(null);
const [diskUsage,setDiskUsage]=useState(null);


    // Fetch data from backend API and update state
    const fetchData=()=>{
      fetch(`${backendAPIUrl}metrics`)
        .then(response => response.json())
        .then(data => {
          const cpuValues = data.MetricDataResults[0].Values;
          const memoryValues = data.MetricDataResults[1].Values;
          const diskValues = data.MetricDataResults[2].Values;
          let sumCPUValues=0,sumDiskValues=0,sumMemoryValues=0;
          for(let i=0;i<cpuValues.length;i++){
            sumCPUValues+=cpuValues[i];
          }
          for(let i=0;i<memoryValues.length;i++){
            sumMemoryValues+=memoryValues[i];
          }
          for(let i=0;i<diskValues.length;i++){
            sumDiskValues+=diskValues[i];
          }
          const avgCpuValues=sumCPUValues/cpuValues.length;
          const avgMemoryValues=sumMemoryValues/memoryValues.length;
          const avgDiskValues=sumDiskValues/diskValues.length;
          setCpuUsage(avgCpuValues);
          setMemoryUsage(avgMemoryValues);
          setDiskUsage(avgDiskValues);
          console.log(avgCpuValues)
          console.log(avgDiskValues)
          console.log(avgMemoryValues)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };


    useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, 5*60*1000);//5 minutes
    },[backendAPIUrl])


    return (
      <div className="dashboard">
        <Navbar />
        <div className="flex-container">
          <div className="flex-item top-item">
            <MetricCard title="CPU LOAD" value={cpuUsage !== null ? cpuUsage.toFixed(2) : 0}/>
          </div>
          <div className="flex-item">
            <MetricCard title="MEMORY USAGE" value={memoryUsage !== null ? memoryUsage.toFixed(2) : 0} />
          </div>
          <div className="flex-item">
            <MetricCard title="DISK USAGE" value={diskUsage !== null ? diskUsage.toFixed(2) : 0} />
          </div>
      </div>
      </div>
    );
  };

export default Dashboard;
