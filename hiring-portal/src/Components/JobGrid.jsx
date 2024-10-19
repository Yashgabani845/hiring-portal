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
    
            
            if (filters.experienceLevel.length > 0) {
                filtered = filtered.filter(job => filters.experienceLevel.includes(job.experienceLevel));
            }
    
            
            if (filters.industry) {
                filtered = filtered.filter(job => 
                    job.industry && job.industry.toLowerCase().includes(filters.industry.toLowerCase())
                );
            }
    
            
            if (filters.workLocation) {
                filtered = filtered.filter(job => 
                    job.workLocation && job.workLocation.toLowerCase().includes(filters.workLocation.toLowerCase())
                );
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
