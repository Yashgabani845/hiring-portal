import React, { useState } from 'react';
import '../CSS/dashboard.css';
import Jobpost from "./JobPostForm";
import Managejob from "./Managejob";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit, faEye, faFilter, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UploadedJobs from './UploadedJobs';
import csoon from "../assests/csoon.jpg"
const Dashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('create-job');

    const handlehome = () => {
        navigate("/");
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'create-job':
                return (
                    <div className="content-section">
                        <Jobpost />
                    </div>
                );
            case 'edit-jobs':
                return (
                    <div className="content-section">
                        <UploadedJobs />
                    </div>
                );
            case 'view-jobs':
                return (
                    <div className="content-section">
                        <UploadedJobs />
                    </div>
                );
            case 'filter-jobs':
                return (
                    <div className="content-section notice-container">
                        <img src={csoon} alt="Coming Soon" className="coming-soon-image" />
                        <h2>Filter Jobs</h2>
                        <p>This feature is coming very soon!</p>
                    </div>
                );
            case 'statistics':
                return (
                    <div className="content-section notice-container">
                        <img src={csoon} alt="Coming Soon" className="coming-soon-image" />
                        <h2>Platform Statistics</h2>
                        <p>This feature is coming very soon!</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebaro">
                <div className="project-title">
                    <h1 onClick={handlehome}>Go to Client View</h1>
                </div>
                <ul>
                    <li className={activeSection === 'create-job' ? 'active' : ''} onClick={() => setActiveSection('create-job')}>
                        <FontAwesomeIcon icon={faPlusCircle} /> Create Job
                    </li>
                    <li className={activeSection === 'edit-jobs' ? 'active' : ''} onClick={() => setActiveSection('edit-jobs')}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Jobs
                    </li>
                    <li className={activeSection === 'view-jobs' ? 'active' : ''} onClick={() => setActiveSection('view-jobs')}>
                        <FontAwesomeIcon icon={faEye} /> View Jobs
                    </li>
                    <li className={activeSection === 'filter-jobs' ? 'active' : ''} onClick={() => setActiveSection('filter-jobs')}>
                        <FontAwesomeIcon icon={faFilter} /> Filter Jobs
                    </li>
                    <li className={activeSection === 'statistics' ? 'active' : ''} onClick={() => setActiveSection('statistics')}>
                        <FontAwesomeIcon icon={faChartBar} /> Statistics
                    </li>
                </ul>
            </aside>
            <main className="content">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
