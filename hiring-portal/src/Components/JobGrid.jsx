import React from "react";
import Jobcard from "./Jobcard";
import "../CSS/jobgrid.css";
import google from "../googlelogo.png";
import facebook from "../facebooklogo.png";
import microsoft from "../microsoft.png";
import amazon from "../amazon.png"
import hirehub from "../logo.png"
const Jobgrid = () => {
    const jobData = [
        { id: 1,comlogo:google, company: "Google", rating: "⭐4.5/5.0", reviews: "450+ reviews", role: "Software Developer Eng." },
        { id: 2,comlogo:amazon, company: "Amazon", rating: "⭐4.7/5.0", reviews: "350+ reviews", role: "Frontend Developer" },
        { id: 3,comlogo:facebook, company: "Facebook", rating: "⭐4.6/5.0", reviews: "300+ reviews", role: "Backend Developer" },
        { id: 4,comlogo:microsoft, company: "Microsoft", rating: "⭐4.8/5.0", reviews: "500+ reviews", role: "Full Stack Developer" },
        { id: 5, comlogo:hirehub,company: "Hirehub", rating: "⭐4.7/5.0", reviews: "400+ reviews", role: "Mobile Developer" },
        { id: 6,comlogo:google, company: "Google", rating: "⭐4.5/5.0", reviews: "450+ reviews", role: "Software Developer Eng." },
        { id: 7,comlogo:amazon, company: "Amazon", rating: "⭐4.7/5.0", reviews: "350+ reviews", role: "Frontend Developer" },
        { id: 8,comlogo:facebook, company: "Facebook", rating: "⭐4.6/5.0", reviews: "300+ reviews", role: "Backend Developer" },
        { id: 9,comlogo:microsoft, company: "Microsoft", rating: "⭐4.8/5.0", reviews: "500+ reviews", role: "Full Stack Developer" },
        { id: 10,comlogo:hirehub, company: "Hirehub", rating: "⭐4.7/5.0", reviews: "400+ reviews", role: "Mobile Developer" }
      
    ];

    return (
        <div className="jobgrid">
            {jobData.map((job) => (
                <Jobcard
                comlogo={job.comlogo}
                id={job.id}
                    key={job.id}
                    company={job.company}
                    rating={job.rating}
                    reviews={job.reviews}
                    role={job.role}
                />
            ))}
        </div>
    );
};

export default Jobgrid;
