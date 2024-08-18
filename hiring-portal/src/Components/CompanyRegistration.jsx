import React, { useState } from 'react';
import '../CSS/company.css';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaFacebook, FaTwitter, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth } from '../firebase/firebase';

const CompanyRegistration = () => {
  const navigate = useNavigate();
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
    twitter: '',
    logo: '',
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `companyLogos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          console.error('Upload error:', error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, logo: downloadURL });
            setUploading(false);
          });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerEmail = localStorage.getItem('userEmail');

    try {
      const response = await axios.post('https://hirebackend-1.onrender.com/api/company', {
        ...formData,
        ownerEmail,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response.data);
      navigate("/owner");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'transportation', label: 'Transportation' },
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
          <label><FaGlobe /> Website</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label><FaPhone /> Phone</label>
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
          <label><FaLinkedin /> LinkedIn</label>
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label><FaFacebook /> Facebook</label>
          <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label><FaTwitter /> Twitter</label>
          <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Company Logo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p>Uploading...</p>}
        </div>
        <button type="submit" className="submit-button" disabled={uploading}>Register Company</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
