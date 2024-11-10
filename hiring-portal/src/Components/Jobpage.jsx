import React, { useState } from "react";
import Jobgrid from "./JobGrid";
import Navbar from "./Navbar";
import "../CSS/jobpage.css";

const Jobpage = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const [filters, setFilters] = useState({
        jobType: [],
        remoteOption: null,
        salaryRange: { min: null, max: null },
        field: '',
        experienceLevel: [],
        workLocation: ''
    });

    //filter logic

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'jobType' || name === 'experienceLevel') {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [name]: checked
                        ? [...(prevFilters[name] || []), value]
                        : (prevFilters[name] || []).filter(item => item !== value)
                }));
            }
        } else if (type === 'radio') {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        }
    };

    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
    }

    return (
        <>
            <Navbar />
            {/* sidebar mobile toggle */}
            {/*  */}
            <div className="jobpage">
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                    {isSidebar ? "x" : "Filters"}
                </div>
                <div className="sidebar"
                    style={{ transform: isSidebar ? "translateX(0%)" : "translateX(-100%" }}
                >
                    <h2 >Filters</h2>
                    <div className="filter" >
                        <h3>Job Type</h3>
                        <label>
                            <input
                                type="checkbox"
                                name="jobType"
                                value="full-time"
                                checked={filters.jobType.includes('full-time')}
                                onChange={handleFilterChange}
                            /> Full-time
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="jobType"
                                value="part-time"
                                checked={filters.jobType.includes('part-time')}
                                onChange={handleFilterChange}
                            /> Part-time
                        </label>
                    </div>
                    <div className="filter" >
                        <label>
                            <input type="radio" name="remoteOption" value="true" onChange={handleFilterChange} /> Remote
                        </label>
                        <label>
                            <input type="radio" name="remoteOption" value="false" onChange={handleFilterChange} /> On-site
                        </label>
                    </div>
                    <div className="filter">

                        <label>
                            Industry:
                            <input
                                type="text"
                                name="industry"
                                value={filters.industry || ""}
                                onChange={handleFilterChange}
                                placeholder="Search for industry"
                            />
                        </label>
                    </div>
                    <div className="filter">

                        <label>
                            Work Location:
                            <input
                                type="text"
                                name="workLocation"
                                value={filters.workLocation || ""}
                                onChange={handleFilterChange}
                                placeholder="Search for location"
                            />
                        </label>
                    </div>

                    <div className="filter"  >
                        <h3>Experience Level</h3>
                        <label>
                            <input
                                type="checkbox"
                                name="experienceLevel"
                                value="entry-level"
                                checked={filters.experienceLevel.includes('entry-level')}
                                onChange={handleFilterChange}
                            /> entry-level
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="experienceLevel"
                                value="mid-level"
                                checked={filters.experienceLevel.includes('mid-level')}
                                onChange={handleFilterChange}
                            /> mid-level
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="experienceLevel"
                                value="senior-level"
                                checked={filters.experienceLevel.includes('senior-level')}
                                onChange={handleFilterChange}
                            /> senior-level
                        </label>
                    </div>
                </div>
                <div className="mainarea">
                    <Jobgrid filters={filters} />
                </div>
            </div>
        </>
    );
};
export default Jobpage;