import React, { useState } from 'react';
import '../../styles/Form.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };
};

const AddRoute = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    distanceInKm: '',
    estimatedDuration: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      origin: formData.origin,
      destination: formData.destination,
      distanceInKm: Number(formData.distanceInKm),
      estimatedDuration: formData.estimatedDuration,
      isActive: true,
    };

    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to create route');
      }

      setMessage('Route created successfully!');
      setFormData({
        origin: '',
        destination: '',
        distanceInKm: '',
        estimatedDuration: '',
      });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Route</h2>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Origin City</label>
          <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Destination City</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Distance (km)</label>
          <input
            type="number"
            min="1"
            name="distanceInKm"
            value={formData.distanceInKm}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Estimated Duration</label>
          <input
            type="text"
            name="estimatedDuration"
            value={formData.estimatedDuration}
            onChange={handleChange}
            placeholder="08:30:00"
            required
          />
        </div>

        <button type="submit" className="btn-submit">Create Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
