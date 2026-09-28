import React, { useEffect, useState } from 'react';
import '../../styles/Form.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };
};

const AddSchedule = () => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    busId: '',
    routeId: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [busResponse, routeResponse] = await Promise.all([
          fetch('/api/bus', { headers: getAuthHeaders() }),
          fetch('/api/route', { headers: getAuthHeaders() }),
        ]);

        const busData = await busResponse.json();
        const routeData = await routeResponse.json();

        setBuses(Array.isArray(busData) ? busData : []);
        setRoutes(Array.isArray(routeData) ? routeData : []);
      } catch (err) {
        setMessage('Failed to load buses or routes');
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (new Date(formData.departureTime) >= new Date(formData.arrivalTime)) {
      setMessage('Arrival time must be after departure time.');
      return;
    }

    const payload = {
      busId: Number(formData.busId),
      routeId: Number(formData.routeId),
      departureTime: new Date(formData.departureTime).toISOString(),
      arrivalTime: new Date(formData.arrivalTime).toISOString(),
      price: Number(formData.price),
      availableSeats: Number(formData.availableSeats),
      isActive: true,
    };

    try {
      const response = await fetch('/api/ticket', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const validationMessage =
          typeof data === 'string'
            ? data
            : data?.message ||
              data?.title ||
              Object.values(data?.errors || {}).flat().join(', ');

        throw new Error(validationMessage || 'Failed to create schedule');
      }

      setMessage('Schedule created successfully!');
      setFormData({
        busId: '',
        routeId: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        availableSeats: '',
      });
    } catch (err) {
      setMessage(err.message || 'Failed to create schedule');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Schedule</h2>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bus</label>
          <select name="busId" value={formData.busId} onChange={handleChange} required>
            <option value="">Select bus</option>
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.busName} ({bus.busNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Route</label>
          <select name="routeId" value={formData.routeId} onChange={handleChange} required>
            <option value="">Select route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.origin} to {route.destination}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Departure Time</label>
          <input
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Arrival Time</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            min="1"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available Seats</label>
          <input
            type="number"
            min="1"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">Create Schedule</button>
      </form>
    </div>
  );
};

export default AddSchedule;
