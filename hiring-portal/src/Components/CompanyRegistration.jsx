import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import "../CSS/company.css";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    location: "",
    website: "",
    email: "",
    phone: "",
    establishedYear: "",
    employeesCount: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    logo: "",
  });
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Basic Info",
    "Contact Details",
    "Social Links",
    "Upload Logo",
  ];

  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "hospitality", label: "Hospitality" },
    { value: "agriculture", label: "Agriculture" },
    { value: "real_estate", label: "Real Estate" },
    { value: "entertainment", label: "Entertainment" },
    { value: "transportation", label: "Transportation" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `companyLogos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error("Upload error:", error);
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
    const ownerEmail = localStorage.getItem("userEmail");
    try {
      await axios.post("http://localhost:5000/api/company", {
        ...formData,
        ownerEmail,
      });
      navigate("/owner");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="basicinfo">
            <TextField
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              margin="normal"
            />
            <Select
              options={industryOptions}
              name="industry"
              value={industryOptions.find(
                (option) => option.value === formData.industry
              )}
              onChange={(option) =>
                setFormData({ ...formData, industry: option.value })
              }
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
          </div>
        );
      case 1:
        return (
          <>
            <TextField
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaGlobe />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaPhone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Established Year"
              name="establishedYear"
              type="number"
              value={formData.establishedYear}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Number of Employees"
              name="employeesCount"
              type="number"
              value={formData.employeesCount}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="LinkedIn"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLinkedin />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Facebook"
              name="facebook"
              type="url"
              value={formData.facebook}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaFacebook />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Twitter"
              name="twitter"
              type="url"
              value={formData.twitter}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaTwitter />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 3:
        return (
          <div style={{ height: "100px", alignContent: "center" }}>
            <Button variant="contained" component="label">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {uploading && <CircularProgress />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="company-registration-container" data-aos="fade-up">
        <h1>Company Registration</h1>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{ marginBottom: "1rem" }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          <div className="stepper-buttons">
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={uploading}
              >
                Register Company
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyRegistration;
