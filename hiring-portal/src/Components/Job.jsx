
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

import { FaRegClock, FaMapMarkerAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";
import "../CSS/job.css"
const JobPage = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f2f2f2;
`;

const JobContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    gap: 20px;
`;

const RecommendedJobs = styled.div`
    width: 48%;
`;

const CurrentJob = styled.div`
    width: 48%;
`;

const JobCard = styled.div`
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
    }
`;

const JobTitle = styled.h1`
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
`;

const JobHeading = styled.h2`
    font-size: 1.8em;
    margin-bottom: 15px;
    color: #333;
`;

const JobSubheading = styled.h3`
    font-size: 1.4em;
    margin-top: 20px;
    color: #333;
`;

const JobDetailsList = styled.ul`
    list-style-type: disc;
    padding-left: 20px;
    color: #555;
`;

const JobDetailItem = styled.li`
    margin-bottom: 8px;
`;

const JobDetail = styled.p`
    margin-bottom: 15px;
    color: #555;
`;

const JobCompany = styled.p`
    font-size: 1.3em;
    color: #555;
    margin-bottom: 10px;
`;

const JobLocation = styled.p`
    font-size: 1.3em;
    color: #555;
    margin-bottom: 10px;
`;

const JobSalary = styled.p`
    font-size: 1.3em;
    color: #555;
    margin-bottom: 10px;
`;

const ApplyButton = styled.button`
    padding: 12px 24px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
`;

const Job = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJobDetails(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (!jobDetails) return <p>Loading...</p>;

    return (
        <JobPage>
            <JobContainer>
                <RecommendedJobs>
                    {/* Recommended Jobs Section */}
                </RecommendedJobs>
                <CurrentJob>
                    <JobTitle>{jobDetails.title}</JobTitle>
                    <JobCompany>{jobDetails.postedBy}</JobCompany>
                    <JobLocation><FaMapMarkerAlt /> {jobDetails.workLocation}</JobLocation>
                    <JobSalary><FaDollarSign /> {jobDetails.salaryRange.min} - {jobDetails.salaryRange.max}</JobSalary>
                    <ApplyButton>Apply Now</ApplyButton>
                    <div>
                        <JobHeading>Job Details</JobHeading>
                        <JobDetail><FaDollarSign /> Pay: {jobDetails.salaryRange.min} - {jobDetails.salaryRange.max}</JobDetail>
                        <JobDetail><FaBriefcase /> Job Type: {jobDetails.employmentType}</JobDetail>
                        <JobDetail><FaRegClock /> Shift and Schedule: {jobDetails.shift ? jobDetails.shift.join(", ") : "N/A"}</JobDetail>
                        <JobDetail><FaMapMarkerAlt /> Location: {jobDetails.workLocation}</JobDetail>
                        <JobSubheading>Responsibilities</JobSubheading>
                        <JobDetailsList>
                            {jobDetails.jobResponsibilities.map((resp, index) => (
                                <JobDetailItem key={index}>{resp}</JobDetailItem>
                            ))}
                        </JobDetailsList>
                        <JobSubheading>Requirements</JobSubheading>
                        <JobDetailsList>
                            {jobDetails.requirements.map((req, index) => (
                                <JobDetailItem key={index}>{req}</JobDetailItem>
                            ))}
                        </JobDetailsList>
                        
                        <JobSubheading>Benefits</JobSubheading>
                        <JobDetailsList>
                            {jobDetails.benefits.map((benefit, index) => (
                                <JobDetailItem key={index}>{benefit}</JobDetailItem>
                            ))}
                        </JobDetailsList>
                        <JobSubheading>Full Job Description</JobSubheading>
                        <JobDetail>{jobDetails.description}</JobDetail>
                    </div>
                </CurrentJob>
            </JobContainer>
        </JobPage>
    );
};

export default Job;
