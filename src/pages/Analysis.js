import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const AnalysisPage = () => {
  const svgRef = useRef();

  // State variables
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMeditations, setTotalMeditations] = useState(0);
  const [topMeditations, setTopMeditations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, meditationData] = await Promise.all([
          axios.get('/api/total-users'),
          axios.get('/api/total-meditations'),
        ]);

        setTotalUsers(userData.data.totalUsers);
        setTotalMeditations(meditationData.data.totalMeditations);
        setTopMeditations(meditationData.data.topMeditations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // D3 visualization
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Example D3 code for visualization
    svg.selectAll('rect')
      .data(topMeditations)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => height - d * 10)
      .attr('width', 40)
      .attr('height', (d) => d * 10)
      .attr('fill', 'blue');

    svg.selectAll('text')
      .data(topMeditations)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 50 + 10)
      .attr('y', (d) => height - d * 10 - 5)
      .attr('font-size', 12)
      .attr('fill', 'white');
  }, [topMeditations]);

  return (
    <div className="analysis-page">
      <h1>Analysis Page</h1>
      <p>Total Users: {totalUsers}</p>
      <p>Total Meditations: {totalMeditations}</p>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default AnalysisPage;
