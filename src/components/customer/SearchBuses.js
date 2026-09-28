import React, { useState } from 'react';
import '../../styles/Search.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { Authorization: `Bearer ${user?.token}` };
};

const SearchBuses = () => {
  const [searchData, setSearchData] = useState({
    source: '',
    destination: '',
    date: ''
  });
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const query = new URLSearchParams({
        origin: searchData.source,
        destination: searchData.destination,
        travelDate: searchData.date
      }).toString();
      const response = await fetch(
        `/api/booking/search-tickets?${query}`,
        { headers: getAuthHeaders() }
      );
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Failed to search buses');
      }
      const data = await response.json();
      setBuses(data);
    } catch (err) {
      setError(err.message);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Buses</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <input type="text" name="source" placeholder="From" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="destination" placeholder="To" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="date" name="date" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-search">Search</button>
      </form>

      {loading && <div className="loading">Searching...</div>}
      {error && <div className="error-alert">{error}</div>}
      
      <div className="buses-grid">
        {buses.map(ticket => (
          <div key={ticket.id} className="bus-card">
            <h3>{ticket.bus?.busName || 'Bus'}</h3>
            <p>Bus Number: {ticket.bus?.busNumber || 'N/A'}</p>
            <p>From: {ticket.route?.origin || searchData.source}</p>
            <p>To: {ticket.route?.destination || searchData.destination}</p>
            <p>Departure: {new Date(ticket.departureTime).toLocaleString()}</p>
            <p>Arrival: {new Date(ticket.arrivalTime).toLocaleString()}</p>
            <p>Available Seats: {ticket.availableSeats}</p>
            <p>Price: ${ticket.price}</p>
            <button className="btn-book">Book Now</button>
          </div>
        ))}
      </div>
      {!loading && !error && buses.length === 0 && (
        <div className="no-results">No schedules found for this route and date.</div>
      )}
    </div>
  );
};

export default SearchBuses;
