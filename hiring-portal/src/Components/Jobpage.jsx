import React from "react";
import Jobgrid from "./JobGrid";
import "../CSS/jobpage.css";

const Jobpage = () => {
    return (
        <div className="jobpage">
            <div className="sidebar">
                <h2>Filters</h2>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> Full-time
                    </label>
                </div>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> Part-time
                    </label>
                </div>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> Remote
                    </label>
                </div>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> On-site
                    </label>
                </div>
            </div>
            <div className="mainarea">
               
                <Jobgrid />
                
            </div>
        </div>
    );
};

export default Jobpage;
