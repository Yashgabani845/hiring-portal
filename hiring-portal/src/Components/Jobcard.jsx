import React from "react";
import { Link } from "react-router-dom";
import "../CSS/jobcard.css";

const Jobcard = ({ id, comlogo, company, rating, reviews, role }) => {
    return (
        <div className="jobcard">
            <div className="joblogo"><img src={comlogo} alt="company logo" /></div>
            <div className="comname">{company}</div>
            <div className="rate">
                <div className="rating">{rating}</div>
                <div className="review">{reviews} </div>
            </div>
            <div className="role">{role}</div>
            <div className="viewjob">
                <Link to={`/job/${id}`}><button>View Job</button></Link>
            </div>
        </div>
    );
};

export default Jobcard;
