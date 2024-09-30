import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Select from 'react-select';

import ReactQuill from 'react-quill';
 
import 'react-quill/dist/quill.snow.css';
import { storage } from '../firebase/firebase';

import "../CSS/admin.css";

const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('allUsers');
    const [employers, setEmployers] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobForm, setJobForm] = useState({
        title: '',
        description: '',
        requirements: '',
        salaryMin: '',
        salaryMax: '',
        workLocation: '',
        role: '',
        department: '',
        employmentType: 'full-time',
        remote: false,
        companyCulture: '',
        applicationDeadline: '',
        industry: '',
        keywords: [],
        contactEmail: '',
        companyWebsite: '',
        jobResponsibilities: [],
        languagesRequired: [],
        type: 'external',
        link: '',
        companyLogo: '' ,
        ownerEmail:'admin@gmail.com'
    });
    const [selectedData, setSelectedData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logo, setLogo] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail === 'admin@gmail.com') {
            setIsAdmin(true);
            fetchEmployers();
            fetchCandidates();
            fetchJobs();
        } else {
            setIsAdmin(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployers();
        fetchCandidates();
        fetchJobs();
    }, []);

    const fetchData = async (endpoint, setter) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}`);
            const data = await response.json();
            setter(data);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    const fetchEmployers = () => fetchData('company', setEmployers);
    const fetchCandidates = () => fetchData('users', setCandidates);
    const fetchJobs = () => fetchData('job', setJobs);

    const handleInputChange = (e) => {
        setJobForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const logoRef = ref(storage, `logos/${file.name}`);
            try {
                await uploadBytes(logoRef, file);
                const logoURL = await getDownloadURL(logoRef);
                setJobForm(prevForm => ({
                    ...prevForm,
                    companyLogo: logoURL
                }));
                setLogo(logoURL);
            } catch (error) {
                console.error('Error uploading logo:', error);
            }
        }
    };

    const handleDescriptionChange = (value) => {
        setJobForm(prevForm => ({
            ...prevForm,
            description: value
        }));
    };

    const handleSelectChange = (name, selectedOptions) => {
        setJobForm({
            ...jobForm,
            [name]: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        console.log(JSON.stringify(jobForm, null, 2));
        
        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobForm),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('Job uploaded successfully!');
                fetchJobs();
                setJobForm({
                    title: '',
                    description: '',
                    requirements: '',
                    salaryMin: '',
                    salaryMax: '',
                    workLocation: '',
                    role: '',
                    department: '',
                    employmentType: 'full-time',
                    remote: false,
                    companyCulture: '',
                    applicationDeadline: '',
                    industry: '',
                    keywords: [],
                    contactEmail: '',
                    companyWebsite: '',
                    jobResponsibilities: [],
                    languagesRequired: [],
                    type: 'external',
                    link: '',
                    companyLogo: ''
                });

                setLogo(null)
            } else {
                console.error('Error uploading job', result);
                alert(`Error uploading job: ${result.message}`);
            }
        } catch (error) {
            console.error('Error uploading job:', error);
        }
    };
    
    

    const handleViewClick = (data) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    const renderModalContent = () => {
        if (!selectedData) return null;

        if (selectedOption === 'allUsers') {
            return (
                <>
                    <h3>Name</h3>
                    <p>{selectedData.name}</p>
                    <h3>Location</h3>
                    <p>{selectedData.location}</p>
                </>
            );
        }
    
        if (selectedOption === 'allCompany') {
            return (
                <>
                    <h3>Name</h3>
                    <p>{selectedData.name}</p>
                    <h3>Description</h3>
                    <p>{selectedData.description}</p>
                    <h3>Industry</h3>
                    <p>{selectedData.industry}</p>
                    <h3>Location</h3>
                    <p>{selectedData.location}</p>
                </>
            );
        }

        return (
            <>
                <h2>{selectedData.title || 'Details'}</h2>
                <p><strong>Description:</strong> {selectedData.description}</p>
                <p><strong>Requirements:</strong> {selectedData.requirements}</p>
                <p><strong>Salary:</strong> ${selectedData.salaryMin} - ${selectedData.salaryMax}</p>
                <p><strong>Location:</strong> {selectedData.workLocation}</p>
                <p><strong>Role:</strong> {selectedData.role}</p>
                <p><strong>Department:</strong> {selectedData.department}</p>
                <p><strong>Employment Type:</strong> {selectedData.employmentType}</p>
                <p><strong>Remote:</strong> {selectedData.remote ? 'Yes' : 'No'}</p>
                <p><strong>Company Culture:</strong> {selectedData.companyCulture}</p>
                <p><strong>Application Deadline:</strong> {selectedData.applicationDeadline}</p>
                <p><strong>Industry:</strong> {selectedData.industry}</p>
                <p><strong>Keywords:</strong> {selectedData.keywords}</p>
                <p><strong>Contact Email:</strong> {selectedData.contactEmail}</p>
                <p><strong>Company Website:</strong> {selectedData.companyWebsite}</p>
                <p><strong>Job Responsibilities:</strong> {selectedData.jobResponsibilities}</p>
                <p><strong>Languages Required:</strong> {selectedData.languagesRequired}</p>
                <p><strong>Link:</strong> <a href={selectedData.link} target="_blank" rel="noopener noreferrer">{selectedData.link}</a></p>
            </>
        );
    };
    const languagesOptions = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'Python', label: 'Python' },
        { value: 'Java', label: 'Java' },
    ];

    const jobResponsibilitiesOptions = [
        { value: 'Developing applications', label: 'Developing applications' },
        { value: 'Team collaboration', label: 'Team collaboration' },
    ];

    const keywordsOptions = [
        { value: 'Frontend', label: 'Frontend' },
        { value: 'Backend', label: 'Backend' },
        { value: 'Fullstack', label: 'Fullstack' },
    ];
    const renderContent = () => {
        const sections = {
            allUsers: candidates,
            allCompany: employers,
            allJobs: jobs
        };

        return (
            <div className="profile-section">
                <h2>{selectedOption.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
                <div className="profile-list">
                    {(sections[selectedOption] || []).map(item => (
                        <div key={item._id} className="profile-card">
                            <h3>{item.name || item.title}</h3>
                            <p>{item.details || item.description}</p>
                            <button onClick={() => handleViewClick(item)}>View {selectedOption === 'allJobs' ? 'Job' : 'Profile'}</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    if (!isAdmin) {
        return (
            <div className="admin-dashboard">
                <h1>Page Not Found</h1>
            </div>
        );
    }


    return (
        <div className="admin-dashboard">
            <div className="sidebara">
                <ul>
                    <li onClick={() => setSelectedOption('allUsers')}>All Users</li>
                    <li onClick={() => setSelectedOption('allCompany')}>All Company</li>
                    <li onClick={() => setSelectedOption('allJobs')}>All Jobs</li>
                    <li onClick={() => setSelectedOption('uploadExternalJob')}>Upload External Job</li>
                </ul>
            </div>
            <div className="content-area">
                {selectedOption === 'uploadExternalJob' ? (
                   <div className="upload-job-section">
                   <h2>Upload External Job</h2>
                   <form onSubmit={handleFormSubmit}>
                       <div className="form-group">
                           <label>Title</label>
                           <input
                               type="text"
                               name="title"
                               placeholder="Enter Job Title"
                               value={jobForm.title}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Description</label>
                           <ReactQuill
                               value={jobForm.description}
                               onChange={handleDescriptionChange}
                               theme="snow"
                               placeholder="Enter job description"
                           />
                       </div>
                       <div className="form-group">
                           <label>Work Location</label>
                           <input
                               type="text"
                               name="workLocation"
                               placeholder="Enter Work Location"
                               value={jobForm.workLocation}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Role</label>
                           <input
                               type="text"
                               name="role"
                               placeholder="Enter Role"
                               value={jobForm.role}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Department</label>
                           <input
                               type="text"
                               name="department"
                               placeholder="Enter Department"
                               value={jobForm.department}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Employment Type</label>
                           <select
                               name="employmentType"
                               value={jobForm.employmentType}
                               onChange={handleInputChange}
                               required
                           >
                               <option value="full-time">Full-Time</option>
                               <option value="part-time">Part-Time</option>
                           </select>
                       </div>
                       <div className="form-group">
                           <label>Application Deadline</label>
                           <input
                               type="date"
                               name="applicationDeadline"
                               value={jobForm.applicationDeadline}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Industry</label>
                           <input
                               type="text"
                               name="industry"
                               placeholder="Enter Industry"
                               value={jobForm.industry}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Keywords</label>
                           <Select
                               isMulti
                               name="keywords"
                               options={keywordsOptions}
                               className="basic-multi-select"
                               classNamePrefix="select"
                               onChange={(selectedOptions) => handleSelectChange('keywords', selectedOptions)}
                               value={keywordsOptions.filter(option => jobForm.keywords.includes(option.value))}
                           />
                       </div>
                       <div className="form-group">
                           <label>Contact Email</label>
                           <input
                               type="email"
                               name="contactEmail"
                               placeholder="Enter Contact Email"
                               value={jobForm.contactEmail}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Company Website</label>
                           <input
                               type="url"
                               name="companyWebsite"
                               placeholder="Enter Company Website"
                               value={jobForm.companyWebsite}
                               onChange={handleInputChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label>Job Responsibilities</label>
                           <Select
                               isMulti
                               name="jobResponsibilities"
                               options={jobResponsibilitiesOptions}
                               className="basic-multi-select"
                               classNamePrefix="select"
                               onChange={(selectedOptions) => handleSelectChange('jobResponsibilities', selectedOptions)}
                               value={jobResponsibilitiesOptions.filter(option => jobForm.jobResponsibilities.includes(option.value))}
                           />
                       </div>
                       <div className="form-group">
                           <label>Languages Required</label>
                           <Select
                               isMulti
                               name="languagesRequired"
                               options={languagesOptions}
                               className="basic-multi-select"
                               classNamePrefix="select"
                               onChange={(selectedOptions) => handleSelectChange('languagesRequired', selectedOptions)}
                               value={languagesOptions.filter(option => jobForm.languagesRequired.includes(option.value))}
                           />
                       </div>
                       <div className="form-group">
                           <label>Link</label>
                           <input
                               type="url"
                               name="link"
                               placeholder="Enter Job Link"
                               value={jobForm.link}
                               onChange={handleInputChange}
                           />
                       </div>
                       <div className="form-group">
                           <label>Company Logo</label>
                           <input
                               type="file"
                               accept="image/*"
                               onChange={handleLogoChange}
                           />
                           {logo && <img src={logo} alt="Company Logo" style={{ width: '100px', height: '100px' }} />}
                       </div>
                       <button type="submit">Submit Job</button>
                   </form>
               </div>
                ) : (
                    renderContent()
                )}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            {renderModalContent()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
