import React, { useEffect, useState } from "react";
import Jobcard from "./Jobcard";
import axios from "axios";
import "../CSS/jobgrid.css";
import Lottie from "react-lottie";
import animationData from "../assests/emptyanimation.json";
import loading from "../assests/loading.json";

const Jobgrid = ({ filters }) => {
  const [jobsWithLogos, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [load, Setload] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          Setload(true);
          const jobResponse = await axios.get("http://localhost:5000/api/job");

          const jobsWithLogos = await Promise.all(
            jobResponse.data.map(async (job) => {
              const companyResponse = await axios.get(
                `http://localhost:5000/api/companies/${job.postedBy}`
              );
              Setload(false);
              return {
                ...job,
                logo: companyResponse.data.logo,
              };
            })
          );

          setJobs(jobsWithLogos);
        } catch (error) {
          Setload(false);
          console.error("Error fetching jobs:", error);
        }
      };

      fetchJobs();
    }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = jobsWithLogos;

      if (filters.jobType.length > 0) {
        filtered = filtered.filter((job) =>
          filters.jobType.includes(job.employmentType)
        );
      }

      if (filters.remoteOption !== null) {
        filtered = filtered.filter(
          (job) => job.remote === (filters.remoteOption === "true")
        );
      }

      if (
        filters.salaryRange.min !== null ||
        filters.salaryRange.max !== null
      ) {
        filtered = filtered.filter((job) => {
          const minSalary = filters.salaryRange.min
            ? parseInt(filters.salaryRange.min, 10)
            : 0;
          const maxSalary = filters.salaryRange.max
            ? parseInt(filters.salaryRange.max, 10)
            : Infinity;
          return (
            job.salaryRange.min >= minSalary && job.salaryRange.max <= maxSalary
          );
        });
      }

      if (filters.experienceLevel.length > 0) {
        filtered = filtered.filter((job) =>
          filters.experienceLevel.includes(job.experienceLevel)
        );
      }

      if (filters.industry) {
        filtered = filtered.filter(
          (job) =>
            job.industry &&
            job.industry.toLowerCase().includes(filters.industry.toLowerCase())
        );
      }

      if (filters.workLocation) {
        filtered = filtered.filter(
          (job) =>
            job.workLocation &&
            job.workLocation
              .toLowerCase()
              .includes(filters.workLocation.toLowerCase())
        );
      }

      setFilteredJobs(filtered);
    };

    applyFilters();
  }, [filters, jobsWithLogos]);

  return (
    <div className="jobgrid">
      {load ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions2} height={250} width={200} />
          <p>Loading jobs...</p>
        </div>
      ) : filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <Jobcard
            comlogo={job.comlogo || job.logo}
            id={job._id}
            key={job._id}
            company={job.postedBy}
            worklocation={job.workLocation}
            department={job.department}
            role={job.role}
          />
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions} height={250} width={200} />
          <p>No jobs to show...</p>
        </div>
      )}
    </div>
  );
};

export default Jobgrid;
