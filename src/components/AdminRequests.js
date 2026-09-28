import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/requests');
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/requests/${id}/approve`, { method: 'PUT' });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/requests/${id}/reject`, { method: 'PUT' });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-section">
      <h2>Bus Owner Registration Requests</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.company}</td>
              <td><span className={`status ${req.status.toLowerCase()}`}>{req.status}</span></td>
              <td>
                {req.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove(req.id)} className="btn-approve">Approve</button>
                    <button onClick={() => handleReject(req.id)} className="btn-reject">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;