import React from "react";
import getty from "../assests/postjobs.png";
import styles from "../CSS/interview.module.css"
const Interview = () => {
    return (
        <div className={styles.interview}>
            <div className={styles.iimg} data-aos="fade-left">
                <img src={getty} alt="Interview Preparation" />
            </div>
            <div className={styles.itextPart} data-aos="fade-right">
                <div className={styles.ititle}>Shortlisting and Mailing</div>
                <div className={styles.islogan}>
                    Single platform for the whole interview process
                </div>
                <div className={styles.viewbtn}>
                    <button className={styles.btn}>Explore More</button>
                </div>
            </div>
        </div>
    );
};

export default Interview;
