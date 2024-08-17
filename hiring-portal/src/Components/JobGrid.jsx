import React, { useEffect, useState } from "react";
import Jobcard from "./Jobcard";
import axios from 'axios';
import "../CSS/jobgrid.css";

const Jobgrid = () => {
    const [jobsWithLogos, setJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobResponse = await axios.get('http://localhost:5000/api/job');
                const jobsWithLogos = await Promise.all(
                    jobResponse.data.map(async (job) => {
                        const companyResponse = await axios.get(`http://localhost:5000/api/companies/${job.postedBy}`);
                        return {
                            ...job,
                            logo: companyResponse.data.logo, 
                        };
                    })
                );
                setJobs(jobsWithLogos);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="jobgrid">
            {jobsWithLogos.map((job) => (
                <Jobcard
                    comlogo={job.comlogo||job.logo} 
                    id={job._id}
                    key={job._id}
                    company={job.postedBy} 
                    rating={"⭐4.5/5.0"} 
                    reviews={"100+ reviews"}
                    role={job.role}
                />
            ))}
        </div>
    );
};

export default Jobgrid;
