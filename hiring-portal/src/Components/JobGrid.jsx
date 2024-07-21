import React, { useEffect, useState } from "react";
import Jobcard from "./Jobcard";
import axios from 'axios';
import comlogo from "../logo.png"
import "../CSS/jobgrid.css";

const Jobgrid = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="jobgrid">
            {jobs.map((job) => (
                <Jobcard
                    comlogo={comlogo} 
                    id={job._id}
                    key={job._id}
                    rating={"⭐4.5/5.0"} 
                    reviews={"100+ reviews"}
                    role={job.role}
                />
            ))}
        </div>
    );
};

export default Jobgrid;
