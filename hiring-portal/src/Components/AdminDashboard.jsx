import React, { useState } from 'react';
import "../CSS/admin.css"
const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Implement search logic here
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="search-section">
                <h2>Search Profiles</h2>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="profile-section">
                <h2>All Employers</h2>
                {/* Map over employers and display their profiles */}
                <div className="profile-list">
                    {/* Example profile */}
                    <div className="profile-card">
                        <h3>Employer Name</h3>
                        <p>Details about the employer</p>
                        <button>View Profile</button>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h2>All Candidates</h2>
                {/* Map over candidates and display their profiles */}
                <div className="profile-list">
                    {/* Example profile */}
                    <div className="profile-card">
                        <h3>Candidate Name</h3>
                        <p>Details about the candidate</p>
                        <button>View Profile</button>
                    </div>
                </div>
            </div>

            <div className="request-section">
                <h2>Company Registration Requests</h2>
                {/* Map over registration requests and display them */}
                <div className="request-list">
                    {/* Example request */}
                    <div className="request-card">
                        <h3>Company Name</h3>
                        <p>Details about the request</p>
                        <div className="request-buttons">
                            <button className="approve">Approve</button>
                            <button className="deny">Deny</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="upload-job-section">
                <h2>Upload Job Manually</h2>
                <form>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" placeholder="Enter job title" />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <input type="text" placeholder="Enter role" />
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <input type="text" placeholder="Enter salary" />
                    </div>
                    <button type="submit">Upload Job</button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
