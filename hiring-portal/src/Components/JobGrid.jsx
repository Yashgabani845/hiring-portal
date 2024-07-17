import React from "react";
import Jobcard from "./Jobcard";
import "../CSS/jobgrid.css";

const Jobgrid = () => {
    const jobData = [
        { id: 1, company: "Amazon", rating: "⭐4.5/5.0", reviews: "450+ reviews", role: "Software Developer Eng." },
        { id: 2, company: "Google", rating: "⭐4.7/5.0", reviews: "350+ reviews", role: "Frontend Developer" },
        { id: 3, company: "Facebook", rating: "⭐4.6/5.0", reviews: "300+ reviews", role: "Backend Developer" },
        { id: 4, company: "Microsoft", rating: "⭐4.8/5.0", reviews: "500+ reviews", role: "Full Stack Developer" },
        { id: 5, company: "Apple", rating: "⭐4.7/5.0", reviews: "400+ reviews", role: "Mobile Developer" }
        // Add more job data as needed
    ];

    return (
        <div className="jobgrid">
            {jobData.map((job) => (
                <Jobcard
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
