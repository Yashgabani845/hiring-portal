import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/jobcard.css";

const Jobcard = ({ id, comlogo, company, rating, reviews, role }) => {
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
            <div className="joblogo"><img src={comlogo} alt="company logo" /></div>
            <div className="comname">{companyName}</div> 
            <div className="rate">
                <div className="rating">{rating}</div>
                <div className="review">{reviews}</div>
            </div>
            <div className="jobrole">{role}</div>
            <div className="viewjob">
                <Link to={`/job/${id}`}><button>View Job</button></Link>
            </div>
        </div>
    );
};

export default Jobcard;
