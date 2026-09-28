import React, { useState, useEffect } from 'react';
import '../../styles/Admin.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { Authorization: `Bearer ${user?.token}` };
};

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/requests', {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/admin/requests/${id}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to approve');
      fetchRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`/api/admin/requests/${id}/reject`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to reject');
      fetchRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading requests...</div>;
  if (error) return <div className="error">{error}</div>;

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
          {requests.length === 0 ? (
            <tr><td colSpan="5" className="no-data">No requests found</td></tr>
          ) : (
            requests.map(req => (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.company}</td>
                <td><span className={`status ${req.status.toLowerCase()}`}>{req.status}</span></td>
                <td>
                  {req.status === 'Pending' && (
                    <div className="action-buttons">
                      <button onClick={() => handleApprove(req.id)} className="btn-approve">✓ Approve</button>
                      <button onClick={() => handleReject(req.id)} className="btn-reject">✗ Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;
