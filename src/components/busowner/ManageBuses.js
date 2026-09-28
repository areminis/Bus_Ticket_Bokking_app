import React, { useState, useEffect } from 'react';
import '../../styles/Admin.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { Authorization: `Bearer ${user?.token}` };
};

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch('/api/bus', {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setBuses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading buses...</div>;

  return (
    <div className="admin-section">
      <h2>Your Buses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Reg Number</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Price/Seat</th>
          </tr>
        </thead>
        <tbody>
  {buses.length === 0 ? (
    <tr>
      <td colSpan="5" className="no-data">No buses found</td>
    </tr>
  ) : (
    buses.map((bus) => (
      <tr key={bus.id}>
        <td>{bus.busName}</td>
        <td>{bus.busNumber}</td>
        <td>{bus.totalSeats}</td>
        <td>{bus.busType}</td>
        <td>N/A</td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
};

export default ManageBuses;
