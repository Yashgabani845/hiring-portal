import React from "react";
import getty from "../assests/postjobs.png";
import "../CSS/interview.css"
const Interview = () => {
    return (
        <div className="interview">
            <div className="iimg" data-aos="fade-left">
                <img src={getty} alt="Interview Preparation" />
            </div>
            <div className="itext-part" data-aos="fade-right">
                <div className="ititle">Shortlisting and Mailing </div>
                <div className="islogan">
                    Single platform for whole interview process
                </div>
                <div className="viewbtn">
                    <button className="btn">Explore More</button>
                </div>
            </div>
        </div>
    );
};

export default Interview;
