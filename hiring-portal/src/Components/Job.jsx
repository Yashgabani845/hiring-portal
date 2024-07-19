import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaRegClock, FaMapMarkerAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";
import "../CSS/job.css"
// Styled Components
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
    const jobDetails = {
        id: id,
        title: "UK Healthcare Recruiter (Freshers/Graduates can apply)",
        company: "Ims People Possible",
        location: "Ahmedabad, Gujarat",
        salary: "Up to ₹30,000 a month",
        type: "Full-time",
        shift: ["Day shift", "UK shift", "Monday to Friday"],
        benefits: ["Food provided", "Health insurance", "Provident Fund"],
        description: `
            Greetings for the day!
            IMS Group is urgently hiring for International Recruiters!!
            Kindly find below the job description!
            ...
        `,
        responsibilities: [
            "Sourcing candidates through various channels",
            "Conducting interviews",
            "Coordinating with clients",
            "Maintaining candidate database"
        ],
        requirements: [
            "Good communication skills",
            "Bachelor's degree",
            "Experience in recruitment is a plus"
        ],
        skills: [
            "Communication",
            "Time management",
            "Organizational skills"
        ]
    };

    const recommendedJobs = [
        {
            id: 2,
            title: "Software Developer",
            company: "Tech Solutions",
            location: "Mumbai, Maharashtra",
            salary: "₹50,000 a month",
            type: "Full-time",
        },
        {
            id: 3,
            title: "Marketing Specialist",
            company: "Creative Minds",
            location: "Delhi, Delhi",
            salary: "₹40,000 a month",
            type: "Part-time",
        },
        {
            id: 4,
            title: "Graphic Designer",
            company: "Design Hub",
            location: "Bengaluru, Karnataka",
            salary: "₹35,000 a month",
            type: "Full-time",
        },
    ];

    return (
        <JobPage>
            <JobContainer>
                <RecommendedJobs>
                    <JobHeading>Recommended Jobs</JobHeading>
                    {recommendedJobs.map((job) => (
                        <JobCard key={job.id}>
                            <h3>{job.title}</h3>
                            <p><FaBriefcase /> {job.company}</p>
                            <p><FaMapMarkerAlt /> {job.location}</p>
                            <p><FaDollarSign /> {job.salary}</p>
                            <p>{job.type}</p>
                        </JobCard>
                    ))}
                </RecommendedJobs>
                <CurrentJob>
                    <JobTitle>{jobDetails.title}</JobTitle>
                    <JobCompany>{jobDetails.company}</JobCompany>
                    <JobLocation><FaMapMarkerAlt /> {jobDetails.location}</JobLocation>
                    <JobSalary><FaDollarSign /> {jobDetails.salary}</JobSalary>
                    <ApplyButton>Apply Now</ApplyButton>
                    <div>
                        <JobHeading>Job Details</JobHeading>
                        <JobDetail><FaDollarSign /> Pay: {jobDetails.salary}</JobDetail>
                        <JobDetail><FaBriefcase /> Job Type: {jobDetails.type}</JobDetail>
                        <JobDetail><FaRegClock /> Shift and Schedule: {jobDetails.shift.join(", ")}</JobDetail>
                        <JobDetail><FaMapMarkerAlt /> Location: {jobDetails.location}</JobDetail>
                        <JobSubheading>Responsibilities</JobSubheading>
                        <JobDetailsList>
                            {jobDetails.responsibilities.map((resp, index) => (
                                <JobDetailItem key={index}>{resp}</JobDetailItem>
                            ))}
                        </JobDetailsList>
                        <JobSubheading>Requirements</JobSubheading>
                        <JobDetailsList>
                            {jobDetails.requirements.map((req, index) => (
                                <JobDetailItem key={index}>{req}</JobDetailItem>
                            ))}
                        </JobDetailsList>
                        <JobSubheading>Skills</JobSubheading>
                        <JobDetailsList>
                            {jobDetails.skills.map((skill, index) => (
                                <JobDetailItem key={index}>{skill}</JobDetailItem>
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
