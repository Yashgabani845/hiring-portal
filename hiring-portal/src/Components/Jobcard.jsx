import React from "react";
import "../CSS/jobcard.css";
import logo from "../logo.png";
const Jobcard=()=>{
    return (
        <div className="jobcard">
<div className="joblogo"><img src={logo} alt="" /></div>
<div className="comname">Amazon</div>
<div className="rate">
    <div className="rating">⭐4.5/5.0</div>
    <div className="review">450+ review</div>
</div>
<div className="role">Software Developer Eng.</div>
<div className="viewjob"><button>view job</button></div>
        </div>
    )
}
export default Jobcard;