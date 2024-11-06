import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import Courses from "../Json/course.json";
import countryData from "../Json/country.json";
import collegesData from "../Json/colleges.json";
import styles from '../CSS/ApplicationForm.module.css'; // Import the CSS module

import Navbar from "./Navbar";
import Footer from "./Footer";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [countryEmoji, setCountryEmoji] = useState("🇺🇸");

  const location = useLocation();
  const { jobId, emailcurrent } = location.state || {};

  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
    mobileNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    instituteName: "",
    course: "",
    graduatingYear: "",
    courseDuration: "",
    countryOfResidence: "",
    cv: "",
    education: [{ degree: "", university: "", cgpa: "" }],
    experience: { company: "", role: "", duration: "" },
    skills: [""],
  });

  const [uploading, setUploading] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState({ resume: false, cv: true });

  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [previewHeight, setPreviewHeight] = useState('auto');
  const previewRef = useRef(null);

  useEffect(() => {
    const codes = countryData.map(country => ({
      name: country.name,
      code: country.dial_code,
      emoji: country.emoji
    }));
    setCountryCodes(codes);
  }, []);

  useEffect(() => {
    if (previewRef.current && previewUrl) {
      const updatePreviewHeight = () => {
        const windowHeight = window.innerHeight;
        const maxHeight = windowHeight * 0.8; // 80% of window height
        setPreviewHeight(`${maxHeight}px`);
      };

      updatePreviewHeight();
      window.addEventListener('resize', updatePreviewHeight);

      return () => window.removeEventListener('resize', updatePreviewHeight);
    }
  }, [previewUrl]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = countryCodes.find(country => country.code === selectedCode);
    setSelectedCountryCode(selectedCode);
    setCountryEmoji(selectedCountry.emoji);
  };

  const handleFileUpload = async (file, fieldName) => {
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can add progress handling here if needed
      },
      (error) => {
        console.error("File upload error:", error);
        toast.error(`Failed to upload ${fieldName}: ${error.message}`);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, [fieldName]: downloadURL }));
          setFilesUploaded((prevState) => ({ ...prevState, [fieldName]: true }));
          toast.success(`${fieldName} uploaded successfully!`);
          setUploading(false);
        });
      }
    );
  };

  const handleFileSelection = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setCurrentField(fieldName);
      setShowPreview(true);
    }
  };

  const handlePreview = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setPreviewHeight('70vh'); // Set a larger height when preview is shown
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile, currentField);
      setShowPreview(false);
      setSelectedFile(null);
      setPreviewUrl('');
      setPreviewHeight('auto');
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedFile(null);
    setPreviewUrl('');
    setPreviewHeight('auto'); // Reset height when closing preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit clicked");

    const requiredFields = [
      "email", "mobileNumber", "firstName", "gender",
      "instituteName", "course", "graduatingYear",
      "courseDuration", "countryOfResidence", "resume"
    ];

    const emptyFields = requiredFields.filter(field => !formData[field]);
    if (emptyFields.length > 0) {
      toast.error(`Please fill out all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    const applicationData = {
      ...formData,
      jobId,
      emailcurrent,
    };

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        toast.success("Application submitted successfully!");
        navigate(`/`);
      } else {
        const errorData = await response.json();
        console.error("Error submitting application:", errorData);
        toast.error(`Failed to submit application: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application.");
    }
  };

  const allFilesUploaded = filesUploaded.resume && filesUploaded.cv;

  return (


    <>

      <Navbar />

      <form className={styles.applicationForm} onSubmit={handleSubmit}>

        <h2>Apply for the Job</h2>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.fgn}>
            <div className={styles.formGroupCode}>
              <label>Country Code:</label>
              <select
                name="countryCode"
                value={selectedCountryCode}
                onChange={handleCountryChange}
                required
              >
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.emoji} ({country.code})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroupNumber}>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last Name (if applicable):</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Institute Name:</label>
          <select
            name="instituteName"
            value={formData.college}
            onChange={handleInputChange}
            required
          >
            <option value="">Select College</option>
            {collegesData.map((college, index) => (
              <option key={index} value={college.college}>
                {college.college}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Course</option>
            {Courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Graduating Year:</label>
          <input
            type="number"
            name="graduatingYear"
            value={formData.graduatingYear}
            onChange={handleInputChange}
            placeholder="Enter your graduating year"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Course Duration:</label>
          <input
            type="text"
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleInputChange}
            placeholder="Enter course duration"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Country of Residence:</label>
          <select
            name="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Country</option>
            {countryData.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Resume (Upload File):</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileSelection(e, 'resume')}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>CV (Upload File, optional):</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileSelection(e, 'cv')}
          />
        </div>

        {showPreview && (
          <div className={styles.filePreviewDialog} style={{ height: previewHeight }}>
            <h3>{selectedFile.name}</h3>
            <div className={styles.previewOptions}>
              <button type="button" onClick={handlePreview}>Preview</button>
              <button type="button" onClick={handleUpload}>Upload</button>
              <button type="button" onClick={closePreview}>Close</button>
            </div>
            {previewUrl && (
              <div className={styles.filePreview} ref={previewRef}>
                {selectedFile.type.startsWith('image/') ? (
                  <img src={previewUrl} alt="File preview" />
                ) : (
                  <iframe src={previewUrl} title="File preview" />
                )}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={uploading || !allFilesUploaded}
        >
          {uploading ? 'Uploading...' : 'Submit Application'}
        </button>
        <ToastContainer />
      </form>
      <Footer />
    </>

  );
};

export default ApplicationForm;