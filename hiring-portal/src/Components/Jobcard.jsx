import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { BsBuildingFill } from "react-icons/bs"; // Added for company icon
import { BsArrowRight } from "react-icons/bs"; // Added for View Job button arrow
import styled from 'styled-components';
import defaultlogo from '../assests/company.png'

import styles from "../CSS/jobcard.module.css";

// Styled components for icons with updated styling
const LocationIcon = styled(IoLocationOutline)`
  font-size: 18px;
  margin-right: 5px;
  color: #5c6b7f;
`;

const WorkIcon = styled(MdWorkOutline)`
  font-size: 18px;
  margin-right: 5px;
  color: #5c6b7f;
`;

const CompanyIcon = styled(BsBuildingFill)`
  font-size: 14px;
  margin-right: 6px;
  color: #4a90e2;
`;

const ArrowIcon = styled(BsArrowRight)`
  font-size: 14px;
  margin-left: 5px;
  transition: transform 0.2s ease;
  
  ${styles.jobViewLink}:hover & {
    transform: translateX(3px);
  }
`;

// Main component
const Jobcard = ({ id, comlogo, company, worklocation, department, role }) => {
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/companies/${company}`);
                if (response.ok) {
                    const data = await response.json();
                    setCompanyName(data.name);
                } else {
                    console.error("Failed to fetch company details");
                }
            } catch (error) {
                console.error("Error fetching company details:", error);
            }
        };

        fetchCompany();
    }, [company]);

    return (
        <div className={styles.jobCardContainer} data-aos="fade-up" data-aos-delay="100">
            {/* Company Logo Section with shape decoration */}
            <div className={styles.jobImageWrapper}>
                <img 
                    src={comlogo || defaultlogo} 
                    alt="company logo" 
                    className={styles.jobCardImage}
                />
            </div>
            
            {/* Job Details Section */}
            <div className={styles.jobCardDetails}>
                <div>
                    {/* Company Name and Location Row */}
                    <div className={styles.jobInfo}>
                        <span className={styles.companyNameTag}>
                            <CompanyIcon />
                            {companyName}
                        </span>
                        <span className={styles.jobLocation}>
                            <LocationIcon />
                            <span>{worklocation}</span>
                        </span>
                    </div>
                    
                    {/* Job Title */}
                    <h3 className={styles.jobCardTitle}>{role}</h3>
                </div>
                
                {/* Department and View Job Row */}
                <div className={styles.jobExtraInfo}>
                    <span className={styles.jobDepartment}>
                        <WorkIcon />
                        <span>{department}</span>
                    </span>
                    <Link to={`/job/${id}`}>
                        <span className={styles.jobViewLink}>
                            View Job
                            <ArrowIcon />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// JobGrid component to wrap the job cards in a grid layout
export const JobGrid = ({ jobs }) => {
    return (
        <div className={styles.jobCardsGrid}>
            {jobs.map((job) => (
                <Link key={job.id} to={`/job/${job.id}`} style={{ textDecoration: 'none' }}>
                    <Jobcard 
                        id={job.id}
                        comlogo={job.comlogo}
                        company={job.company}
                        worklocation={job.worklocation}
                        department={job.department}
                        role={job.role}
                    />
                </Link>
            ))}
        </div>
    );
};

export default Jobcard;