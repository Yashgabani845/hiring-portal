import React, { useState } from "react";
import Select from 'react-select';
import Jobgrid from "./JobGrid";
import "../CSS/jobpage.css";

const Jobpage = () => {
    const [selectedLocations, setSelectedLocations] = useState([]);

    const locations = [
            { value: 'amd', label: 'Ahmedabad' },
            { value: 'sur', label: 'Surat' },
            { value: 'raj', label: 'Rajkot' },
            { value: 'vad', label: 'Vadodara' },
            { value: 'gandhinagar', label: 'Gandhinagar' },
            { value: 'ban', label: 'Bangalore' },
            { value: 'kol', label: 'Kolkata' },
            { value: 'mum', label: 'Mumbai' },
            { value: 'navi_mum', label: 'Navi Mumbai' },
            { value: 'thane', label: 'Thane' },
            { value: 'pune', label: 'Pune' },
            { value: 'hyd', label: 'Hyderabad' },
            { value: 'chennai', label: 'Chennai' },
            { value: 'delhi', label: 'Delhi' },
            { value: 'noida', label: 'Noida' },
            { value: 'gur', label: 'Gurgaon' },
            { value: 'jaipur', label: 'Jaipur' },
            { value: 'lucknow', label: 'Lucknow' },
            { value: 'kanpur', label: 'Kanpur' },
            { value: 'nagpur', label: 'Nagpur' },
            { value: 'indore', label: 'Indore' },
            { value: 'bhopal', label: 'Bhopal' },
            { value: 'patna', label: 'Patna' },
            { value: 'ranchi', label: 'Ranchi' },
            { value: 'bhubaneswar', label: 'Bhubaneswar' },
            { value: 'chandigarh', label: 'Chandigarh' },
            { value: 'amritsar', label: 'Amritsar' },
            { value: 'ludhiana', label: 'Ludhiana' },
            { value: 'dehradun', label: 'Dehradun' },
            { value: 'shimla', label: 'Shimla' },
            { value: 'srinagar', label: 'Srinagar' },
            { value: 'jammu', label: 'Jammu' },
            { value: 'panaji', label: 'Panaji' },
            { value: 'mangalore', label: 'Mangalore' },
            { value: 'mysore', label: 'Mysore' },
            { value: 'coimbatore', label: 'Coimbatore' },
            { value: 'madurai', label: 'Madurai' },
            { value: 'trivandrum', label: 'Trivandrum' },
            { value: 'kochi', label: 'Kochi' },
            { value: 'vizag', label: 'Visakhapatnam' },
            { value: 'vijayawada', label: 'Vijayawada' },
            { value: 'raipur', label: 'Raipur' },
            { value: 'guwahati', label: 'Guwahati' },
            { value: 'shillong', label: 'Shillong' },
        ];
        
    

    const handleLocationChange = (selectedOptions) => {
        setSelectedLocations(selectedOptions || []);
    };

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
                        <input type="radio" name="remote" /> Remote
                    </label>
                </div>
                <div className="filter">
                    <label>
                        <input type="radio" name="remote" /> On-site
                    </label>
                </div>
                <div className="filter">
                    <label>
                        Salary Range:
                    </label>
                    <div className="salary-range">
                        <input type="number" min="0" max="200000" step="1000" placeholder="Min" />
                        <input type="number" min="0" max="200000" step="1000" placeholder="Max" />
                    </div>
                </div>
                <div className="filter">
                    <label>
                        Field:
                        <select>
                            <option value="software">Software Development</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales</option>
                            <option value="hr">Human Resources</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="filter">
                    <label>
                        Work Location:
                    </label>
                    <Select
                        isMulti
                        options={locations}
                        value={selectedLocations}
                        onChange={handleLocationChange}
                        className="location-select"
                        placeholder="Select locations"
                    />
                </div>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> Entry Level
                    </label>
                </div>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> Mid Level
                    </label>
                </div>
                <div className="filter">
                    <label>
                        <input type="checkbox" /> Senior Level
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
