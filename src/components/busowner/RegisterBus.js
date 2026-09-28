import React, { useState } from 'react';
import '../../styles/Form.css';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };
};

const RegisterBus = () => {
  const [formData, setFormData] = useState({
    busName: '',
    registrationNumber: '',
    capacity: 0,
    type: 'AC',
    pricePerSeat: 0
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
  busNumber: formData.registrationNumber,
  busName: formData.busName,
  busType: formData.type,
  totalSeats: Number(formData.capacity)
};

  try {
    const response = await fetch('/api/bus', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Failed to register bus');

    setMessage('Bus registered successfully!');
    setFormData({
      busName: '',
      registrationNumber: '',
      capacity: 0,
      type: 'AC',
      pricePerSeat: 0
    });
  } catch (err) {
    setMessage(err.message);
  }
};

  return (
    <div className="form-container">
      <h2>Register New Bus</h2>
      {message && <div className={`alert ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</div>}
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bus Name</label>
          <input type="text" name="busName" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Registration Number</label>
          <input type="text" name="registrationNumber" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input type="number" name="capacity" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Bus Type</label>
          <select name="type" onChange={handleChange}>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Sleeper">Sleeper</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price Per Seat ($)</label>
          <input type="number" name="pricePerSeat" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-submit">Register Bus</button>
      </form>
    </div>
  );
};

export default RegisterBus;
