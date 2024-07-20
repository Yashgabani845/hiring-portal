import React, { useState } from 'react';
import '../CSS/company.css';
import Select from 'react-select';
import axios from 'axios';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    location: '',
    website: '',
    email: '',
    phone: '',
    establishedYear: '',
    employeesCount: '',
    linkedin: '',
    facebook: '',
    twitter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/company', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response.data);
      // Handle successful response (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' }
  ];

  return (
    <div className="company-registration-container">
      <h1>Company Registration</h1>
      <form onSubmit={handleSubmit} className="company-registration-form">
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <Select
            options={industryOptions}
            name="industry"
            value={industryOptions.find(option => option.value === formData.industry)}
            onChange={(option) => setFormData({ ...formData, industry: option.value })}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Established Year</label>
          <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Number of Employees</label>
          <input type="number" name="employeesCount" value={formData.employeesCount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Facebook</label>
          <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Twitter</label>
          <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Register Company</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
