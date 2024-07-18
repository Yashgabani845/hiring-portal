import React, { useState } from 'react';
import Select from 'react-select';
import '../CSS/jobpostform.css';

const JobPostForm = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        company: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        type: 'Full-time',
        shift: '',
        benefits: [],
        description: '',
        skills: [],
        experience: '',
        education: '',
        applicationDeadline: '',
        role: '',
        department: '',
        employmentType: 'full-time'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails({ ...jobDetails, [name]: value });
    };

    const handleSelectChange = (selectedOptions, { name }) => {
        setJobDetails({ ...jobDetails, [name]: selectedOptions.map(option => option.value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Job Details:', jobDetails);
    };

    const skillsOptions = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'CSS', label: 'CSS' },
        // Add more skill options as needed
    ];

    const benefitsOptions = [
        { value: 'Health Insurance', label: 'Health Insurance' },
        { value: 'Provident Fund', label: 'Provident Fund' },
        { value: 'Food Provided', label: 'Food Provided' },
        // Add more benefit options as needed
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
                    Company Name:
                    <input
                        type="text"
                        name="company"
                        value={jobDetails.company}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={jobDetails.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Salary Range:
                    <div className="salary-range">
                        <input
                            type="number"
                            name="salaryMin"
                            placeholder="Min"
                            value={jobDetails.salaryMin}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="salaryMax"
                            placeholder="Max"
                            value={jobDetails.salaryMax}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>
                <label>
                    Job Type:
                    <select
                        name="type"
                        value={jobDetails.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Internship">Internship</option>
                    </select>
                </label>
                <label>
                    Shift and Schedule:
                    <input
                        type="text"
                        name="shift"
                        value={jobDetails.shift}
                        onChange={handleChange}
                        required
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
                    Job Description:
                    <textarea
                        name="description"
                        value={jobDetails.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Required Skills:
                    <Select
                        isMulti
                        name="skills"
                        options={skillsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                </label>
                <label>
                    Experience:
                    <input
                        type="text"
                        name="experience"
                        value={jobDetails.experience}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Education:
                    <input
                        type="text"
                        name="education"
                        value={jobDetails.education}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Application Deadline:
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={jobDetails.applicationDeadline}
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
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default JobPostForm;
