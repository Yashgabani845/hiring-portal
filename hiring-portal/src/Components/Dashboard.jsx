import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleViewJobs = () => {
        navigate('/uploadedjobs');
    };
    const handlecreatejob = () => {
        navigate('/postjob');
    }

    return (
        <div className="employer-dashboard">
            <h1>Employer Dashboard</h1>

            <div className="card-section">
                <div className="card">
                    <h2>Create New Job</h2>
                    <button onClick={handlecreatejob}>Create Job</button>
                </div>

                <div className="card">
                    <h2>Edit Previous Jobs</h2>
                    <button>Edit Jobs</button>
                </div>

                <div className="card">
                    <h2>Uploaded Jobs</h2>
                    <button onClick={handleViewJobs}>View Jobs</button>
                </div>
            </div>

            <div className="filter-section">
                <h2>Filter Jobs</h2>
                <form>
                    <div className="form-group">
                        <label>Role</label>
                        <input type="text" placeholder="Enter role" />
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <input type="text" placeholder="Enter salary range" />
                    </div>
                    <button type="submit">Apply Filters</button>
                </form>
            </div>

            <div className="statistics-section">
                <h2>Platform Statistics</h2>
                <button>View Statistics</button>
            </div>
        </div>
    );
};

export default Dashboard;
