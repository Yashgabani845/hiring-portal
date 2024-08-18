import React, { useState } from "react";
import Select from 'react-select';
import Jobgrid from "./JobGrid";
import Navbar from "./Navbar";
import "../CSS/jobpage.css";

const Jobpage = () => {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filters, setFilters] = useState({
        jobType: [],
        remoteOption: null,
        salaryRange: { min: null, max: null },
        field: '',
        experienceLevel: [],
        locations: []
    });

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
        setFilters(prevFilters => ({
            ...prevFilters,
            locations: selectedOptions ? selectedOptions.map(option => option.value) : []
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <>
            <Navbar />
            <div className="jobpage">
                <div className="sidebar">
                    <h2>Filters</h2>
                    <div className="filter">
                        <label>
                            <input type="checkbox" name="jobType" value="full-time" onChange={handleFilterChange} /> Full-time
                        </label>
                        <label>
                            <input type="checkbox" name="jobType" value="part-time" onChange={handleFilterChange} /> Part-time
                        </label>
                    </div>
                    <div className="filter">
                        <label>
                            <input type="radio" name="remoteOption" value="true" onChange={handleFilterChange} /> Remote
                        </label>
                        <label>
                            <input type="radio" name="remoteOption" value="false" onChange={handleFilterChange} /> On-site
                        </label>
                    </div>
                    
                    <div className="filter">
                        <label>
                            Field:
                            <select
                                name="field"
                                onChange={handleFilterChange}
                            >
                                <option value="">Select</option>
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
                            value={locations.filter(loc => filters.locations.includes(loc.value))}
                            onChange={handleLocationChange}
                            className="location-select"
                            placeholder="Select locations" />
                    </div>
                    <div className="filter">
                        <label>
                            <input type="checkbox" name="experienceLevel" value="entry" onChange={handleFilterChange} /> Entry Level
                        </label>
                        <label>
                            <input type="checkbox" name="experienceLevel" value="mid" onChange={handleFilterChange} /> Mid Level
                        </label>
                        <label>
                            <input type="checkbox" name="experienceLevel" value="senior" onChange={handleFilterChange} /> Senior Level
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
