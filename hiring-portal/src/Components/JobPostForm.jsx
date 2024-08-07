import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../CSS/jobpostform.css';
import { useNavigate } from 'react-router-dom';
const JobPostForm = () => {
    const navigate = useNavigate()
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        requirements: [],
        postedBy: '',
        type: 'native',
        salaryRange: { min: '', max: '' },
        workLocation: '',
        role: '',
        department: '',
        employmentType: 'full-time',
        remote: false,
        benefits: [],
        companyCulture: '',
        applicationDeadline: '',
        experienceLevel: '',
        educationLevel: '',
        industry: '',
        keywords: [],
        contactEmail: '',
        companyWebsite: '',
        jobResponsibilities: [],
        languagesRequired: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails({ ...jobDetails, [name]: value });
    };

    const handleSelectChange = (selectedOptions, { name }) => {
        setJobDetails({ ...jobDetails, [name]: selectedOptions ? selectedOptions.map(option => option.value) : [] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const ownerEmail = localStorage.getItem('userEmail');
    
        try {
            const response = await axios.post('http://localhost:5000/api/jobs', {
                ...jobDetails,
                ownerEmail 
            });
    
            console.log('Job posted successfully:', response.data);
            navigate("/owner")
        } catch (error) {
            console.error('Failed to post job:', error.response.data);
        }
    };
    

    const skillsOptions = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'CSS', label: 'CSS' },
    ];

    const benefitsOptions = [
        { value: 'Health Insurance', label: 'Health Insurance' },
        { value: 'Provident Fund', label: 'Provident Fund' },
        { value: 'Food Provided', label: 'Food Provided' },
    ];

    return (
        <div className="job-post-form-container">
            <h1>Post a New Job</h1>
            <form className="job-post-form" onSubmit={handleSubmit}>
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="title"
                        value={jobDetails.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={jobDetails.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Requirements:
                    <Select
                        isMulti
                        name="requirements"
                        options={skillsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                </label>
                <label>
                    Salary Range:
                    <div className="salary-range">
                        <input
                            type="number"
                            name="salaryRange.min"
                            placeholder="Min"
                            value={jobDetails.salaryRange.min}
                            onChange={(e) => setJobDetails({ ...jobDetails, salaryRange: { ...jobDetails.salaryRange, min: e.target.value } })}
                            required
                        />
                        <input
                            type="number"
                            name="salaryRange.max"
                            placeholder="Max"
                            value={jobDetails.salaryRange.max}
                            onChange={(e) => setJobDetails({ ...jobDetails, salaryRange: { ...jobDetails.salaryRange, max: e.target.value } })}
                            required
                        />
                    </div>
                </label>
                <label>
                    Work Location:
                    <input
                        type="text"
                        name="workLocation"
                        value={jobDetails.workLocation}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={jobDetails.role}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={jobDetails.department}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Employment Type:
                    <select
                        name="employmentType"
                        value={jobDetails.employmentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                    </select>
                </label>
                <label>
                    Remote:
                    <input
                        type="checkbox"
                        name="remote"
                        checked={jobDetails.remote}
                        onChange={(e) => setJobDetails({ ...jobDetails, remote: e.target.checked })}
                    />
                </label>
                <label>
                    Benefits:
                    <Select
                        isMulti
                        name="benefits"
                        options={benefitsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                </label>
                <label>
                    Company Culture:
                    <input
                        type="text"
                        name="companyCulture"
                        value={jobDetails.companyCulture}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Application Deadline:
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={jobDetails.applicationDeadline}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Experience Level:
                    <input
                        type="text"
                        name="experienceLevel"
                        value={jobDetails.experienceLevel}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Education Level:
                    <input
                        type="text"
                        name="educationLevel"
                        value={jobDetails.educationLevel}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Industry:
                    <input
                        type="text"
                        name="industry"
                        value={jobDetails.industry}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Keywords:
                    <Select
                        isMulti
                        name="keywords"
                        options={skillsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                </label>
                <label>
                    Contact Email:
                    <input
                        type="email"
                        name="contactEmail"
                        value={jobDetails.contactEmail}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Company Website:
                    <input
                        type="url"
                        name="companyWebsite"
                        value={jobDetails.companyWebsite}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Job Responsibilities:
                    <Select
                        isMulti
                        name="jobResponsibilities"
                        options={skillsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                </label>
                <label>
                    Languages Required:
                    <Select
                        isMulti
                        name="languagesRequired"
                        options={skillsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                </label>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default JobPostForm;
