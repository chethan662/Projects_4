// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching member data:', error);
        alert('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  const handlePageChange = direction => {
    setCurrentPage(prevPage => {
      const nextPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(nextPage, Math.ceil(members.length / itemsPerPage)));
    });
  };

  return (
    <div className="app-container">
      <h1>Employee Data Table</h1>
      <table className="member-table">
        <thead className='thread'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handlePageChange('previous')} >
          Previous
        </button>
        <span> {currentPage}  </span>
        <button onClick={() => handlePageChange('next')} >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;