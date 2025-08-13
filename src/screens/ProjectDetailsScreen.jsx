import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import axios from 'axios';

const ProjectDetailsScreen = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await api.get(`/enquiries/project-summary/${projectId}`);
        setProjectData(res.data);
      } catch (err) {
        console.error('Failed to fetch project data:', err);
      }
    };
    fetchProjectData();
  }, [projectId]);

  if (!projectData) return <div>Loading...</div>;

  return (
  <div style={{ padding: 20 }}>
    <h2>📌 Project Summary for {projectData.projectId}</h2>
    
    <p><b>Client:</b> {projectData.clientName || 'N/A'}</p>
    <p><b>Wagon Type:</b> {projectData.wagonType || 'N/A'}</p>
    
    <p><b>Delivery Period:</b> 
      {projectData.startDate 
        ? new Date(projectData.startDate).toLocaleDateString() 
        : 'N/A'} 
      {' '}to{' '}
      {projectData.endDate 
        ? new Date(projectData.endDate).toLocaleDateString() 
        : 'N/A'}
    </p>

    <p><b>Total Ordered:</b> {projectData.totalOrdered}</p>
    <p><b>Delivered:</b> {projectData.delivered}</p>
    <p><b>Pending:</b> {projectData.pending}</p>
    <p><b>Total Quoted Price:</b> 
  {projectData.quotedPrice 
    ? `₹${Number(projectData.quotedPrice).toLocaleString()}` 
    : 'N/A'}
</p>
<p><b>Quoted Price per Wagon:</b> 
  {projectData.pricePerWagon 
    ? `₹${Number(projectData.pricePerWagon).toLocaleString()}` 
    : 'N/A'}
</p>


    <h4>📅 Daily Wagon Delivery Status:</h4>
    <table border="1" cellPadding="10" style={{ marginTop: '10px', width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Wagons Delivered</th>
        </tr>
      </thead>
      <tbody>
        {projectData.dateWiseDelivery && Object.entries(projectData.dateWiseDelivery).length > 0 ? (
          Object.entries(projectData.dateWiseDelivery).map(([date, count]) => (
            <tr key={date}>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td>{count}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No delivery data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default ProjectDetailsScreen;
