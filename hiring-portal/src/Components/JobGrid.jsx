import React, { useEffect, useState } from "react";
import Jobcard from "./Jobcard";
import axios from 'axios';
import "../CSS/jobgrid.css";

const Jobgrid = ({ filters }) => {
    const [jobsWithLogos, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetch all jobs
                const jobResponse = await axios.get('https://hirebackend-1.onrender.com/api/job');
                
                // Fetch company logos for each job
                const jobsWithLogos = await Promise.all(
                    jobResponse.data.map(async (job) => {
                        const companyResponse = await axios.get(`https://hirebackend-1.onrender.com/api/companies/${job.postedBy}`);
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

    useEffect(() => {
        const applyFilters = () => {
            let filtered = jobsWithLogos;

            if (filters.jobType.length > 0) {
                filtered = filtered.filter(job => filters.jobType.includes(job.employmentType));
            }

            if (filters.remoteOption !== null) {
                filtered = filtered.filter(job => job.remote === (filters.remoteOption === 'true'));
            }

            if (filters.salaryRange.min !== null || filters.salaryRange.max !== null) {
                filtered = filtered.filter(job => {
                    const minSalary = filters.salaryRange.min ? parseInt(filters.salaryRange.min, 10) : 0;
                    const maxSalary = filters.salaryRange.max ? parseInt(filters.salaryRange.max, 10) : Infinity;
                    return job.salaryRange.min >= minSalary && job.salaryRange.max <= maxSalary;
                });
            }

            if (filters.field) {
                filtered = filtered.filter(job => job.field === filters.field);
            }

            if (filters.experienceLevel.length > 0) {
                filtered = filtered.filter(job => filters.experienceLevel.includes(job.experienceLevel));
            }

            if (filters.locations.length > 0) {
                filtered = filtered.filter(job => filters.locations.includes(job.workLocation));
            }

            setFilteredJobs(filtered);
        };

        applyFilters();
    }, [filters, jobsWithLogos]);

    return (
        <div className="jobgrid">
            {filteredJobs.map((job) => (
                <Jobcard
                    comlogo={job.comlogo || job.logo}
                    id={job._id}
                    key={job._id}
                    company={job.postedBy}
                    worklocation={job.workLocation}
                    department={job.department}
                    role={job.role}
                />
            ))}
        </div>
    );
};

export default Jobgrid;
