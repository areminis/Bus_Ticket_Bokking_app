import React, { useState, useEffect } from 'react';
import '../../styles/Bookings.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { Authorization: `Bearer ${user?.token}` };
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/customer/bookings', {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-data">No bookings yet</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.busName}</h3>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Seats: {booking.seats}</p>
              <p>Total: ${booking.total}</p>
              <p>Status: <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
