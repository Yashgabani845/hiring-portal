import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import styled from 'styled-components';
import defaultlogo from '../assests/company.png'

import styles from "../CSS/jobcard.module.css";

// Styled components for icons
const LocationIcon = styled(IoLocationOutline)`
    font-size: 20px;
    margin-right: 3px;
        padding-top:2px;

`;

const WorkIcon = styled(MdWorkOutline)`
    font-size: 20px;
    margin-right: 3px;
        margin-top:2px;

`;



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
        <Link to={`/job/${id}`} data-aos="fade-up" data-aos-delay="100">
            <div className={styles.jobCardContainer}>
                <div className={styles.jobImageWrapper}>
                    <img src={comlogo || defaultlogo} alt="company logo" className={styles.jobCardImage} />
                </div>
                <div className={styles.jobCardDetails}>
                    <div className={styles.jobInfo}>
                        <span className={styles.companyNameTag}>{companyName}</span>
                        <span className={styles.jobLocation}>
                            <LocationIcon />
                            <span>{worklocation}</span>
                        </span>
                    </div>
                    <h3 className={styles.jobCardTitle}>{role}</h3>
                    <div className={styles.jobExtraInfo}>
                        <span className={styles.jobDepartment}>
                            <WorkIcon />
                            <span>{department}</span>
                        </span>
                        <Link to={`/job/${id}`}>
                            <span className={styles.jobViewLink}>View Job</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default Jobcard;
