import React, { useState, useEffect } from 'react';
import '../../styles/Admin.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { Authorization: `Bearer ${user?.token}` };
};

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/bookings', {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-section">
      <h2>All Bus Bookings</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Bus</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr><td colSpan="6" className="no-data">No bookings found</td></tr>
          ) : (
            bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customerName}</td>
                <td>{booking.busName}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td><span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                <td>${booking.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
