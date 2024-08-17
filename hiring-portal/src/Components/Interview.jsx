import React from "react";
import getty from "../postjobs.png";
import "../CSS/interview.css"
const Interview = () => {
    return (
        <div className="interview">
            <div className="itext-part">
                <div className="ititle">Shortlisting and Mailing </div>
                <div className="islogan">Single platform for whole interview process</div>
                <div className="viewbtn">
                    <button className="btn">Explore More</button>
                </div>
            </div>

            <div className="iimg">
                <img src={getty} alt="Interview Preparation" />
            </div>
        </div>
    );
};

export default Interview;
