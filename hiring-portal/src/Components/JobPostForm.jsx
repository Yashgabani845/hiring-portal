import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import options from '../Json/skills.json';
import '../CSS/jobpostform.css';

const JobPostForm = () => {
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
        experienceLevel: 'entry-level',
        remote: false,
        companyCulture: '',
        applicationDeadline: '',
        industry: '',
        keywords: [],
        contactEmail: '',
        companyWebsite: '',
        jobResponsibilities: [],
        languagesRequired: [],
        link: null
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

            const response = await axios.post('http://localhost:5000/api/postjob', {
                ...jobDetails,
                ownerEmail
            });

            console.log('Job posted successfully:', response.data);
            toast.success('Job posted successfully!');


            setJobDetails({
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
                experienceLevel: 'entry-level',
                remote: false,
                companyCulture: '',
                applicationDeadline: '',
                industry: '',
                keywords: [],
                contactEmail: '',
                companyWebsite: '',
                jobResponsibilities: [],
                languagesRequired: [],
                link: null
            });
        } catch (error) {
            console.error('Failed to post job:', error);
            toast.error(error.response?.data?.message || 'Failed to post job. Please try again.');
        }
    };

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
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selected) => handleSelectChange(selected, { name: 'requirements' })}
                        value={options.filter(option => jobDetails.requirements.includes(option.value))}
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
                    Experience Level:
                    <select
                        name="experienceLevel"
                        value={jobDetails.experienceLevel}
                        onChange={handleChange}
                    // required
                    >
                        <option value="entry-level">entry-level</option>
                        <option value="mid-level">mid-level</option>
                        <option value="senior-level">senior-level</option>
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
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selected) => handleSelectChange(selected, { name: 'keywords' })}
                        value={options.filter(option => jobDetails.keywords.includes(option.value))}
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
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={jobDetails.role}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={jobDetails.department}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Job Responsibilities:
                    <Select
                        isMulti
                        name="jobResponsibilities"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selected) => handleSelectChange(selected, { name: 'jobResponsibilities' })}
                        value={options.filter(option => jobDetails.jobResponsibilities.includes(option.value))}
                    />
                </label>

                <label>
                    Languages Required:
                    <Select
                        isMulti
                        name="languagesRequired"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selected) => handleSelectChange(selected, { name: 'languagesRequired' })}
                        value={options.filter(option => jobDetails.languagesRequired.includes(option.value))}
                    />
                </label>

                <button type="submit">Post Job</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default JobPostForm;