import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import styled from 'styled-components';
import defaultlogo from '../company.png'

import "../CSS/jobcard.css";

// Styled components for icons
const LocationIcon = styled(IoLocationOutline)`
    font-size: 20px;
    margin-right: 3px;
        padding-top:2px;

`;

const WorkIcon = styled(MdWorkOutline)`
    font-size: 20px;
    margin-left: 10px;
    margin-right: 3px;
        margin-top:2px;

`;

const DepartmentIcon = styled(FcDepartment)`
    font-size: 20px;
    margin-left: 10px;
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
        <div className="jobcard">
            <div className="joblogo"><img src={comlogo ||defaultlogo} alt="company logo" /></div>
            <div className="comname">{companyName}</div>
            <div className="rate">
                <div className="rating">
                    <LocationIcon />
                   <span>{worklocation}</span> 
                </div>
                <div className="department">
                    <WorkIcon />
                    <span>   {department}</span> 
                </div>
            </div>
            <div className="jobrole">{role}</div>
            <div className="viewjob">
                <Link to={`/job/${id}`}><button>View Job</button></Link>
            </div>
        </div>
    );
};

export default Jobcard;
