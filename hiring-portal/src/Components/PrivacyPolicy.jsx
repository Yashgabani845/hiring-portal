import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from '../CSS/privacyPolicy.module.css';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <section className={styles.privacyPolicy}>
                <h1 className={styles.title}>Privacy Policy</h1>
                <p className={styles.intro}>
                    Welcome to Hiring Portal. This privacy policy explains how we collect, use, and share your personal information when you use our platform. By using Hiring Portal, you agree to the terms of this policy.
                </p>

                <div className={styles.infoGroup}>
                    <div className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                        <p className={styles.sectionDescription}>
                            When you use Hiring Portal, we may collect the following types of information:
                        </p>
                        <ul className={styles.infoList}>
                            <li>
                                <strong>Personal Information:</strong> This includes your name, email address, phone number, and any other information you provide when registering or using our services.
                            </li>
                            <li>
                                <strong>Job Application Information:</strong> We collect details related to the jobs you apply for, including resumes and cover letters.
                            </li>
                            <li>
                                <strong>Assessment Information:</strong> This includes your performance data from coding assessments completed within the platform.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> We collect information about how you use Hiring Portal, such as the pages you visit and the actions you take on the platform.
                            </li>
                        </ul>
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                        <p className={styles.sectionDescription}>
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className={styles.infoList}>
                            <li>To provide, operate, and maintain the Hiring Portal platform.</li>
                            <li>To process job applications and provide notifications on application status.</li>
                            <li>To facilitate coding assessments and manage secure link integrity.</li>
                            <li>To improve user experience and optimize our platform’s functionality.</li>
                            <li>To communicate with you, including sending notifications and promotional emails.</li>
                            <li>To comply with legal obligations and prevent fraudulent activities.</li>
                        </ul>
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>3. How We Share Your Information</h2>
                        <p className={styles.sectionDescription}>
                            We do not sell your personal information. However, we may share your information in the following cases:
                        </p>
                        <ul className={styles.infoList}>
                            <li>
                                <strong>With Service Providers:</strong> We share your information with trusted third-party service providers to facilitate job postings, manage assessments, and improve our services.
                            </li>
                            <li>
                                <strong>For Legal Reasons:</strong> We may share your information if required by law or in response to valid requests by government authorities.
                            </li>
                        </ul>
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>4. Your Rights</h2>
                        <p className={styles.sectionDescription}>
                            As a user of Hiring Portal, you have the following rights regarding your personal data:
                        </p>
                        <ul className={styles.infoList}>
                            <li>
                                <strong>Access:</strong> You have the right to request access to the information we hold about you.
                            </li>
                            <li>
                                <strong>Correction:</strong> You can request that we correct any inaccurate information about you.
                            </li>
                            <li>
                                <strong>Deletion:</strong> You can request the deletion of your personal data from our systems.
                            </li>
                            <li>
                                <strong>Objection:</strong> You have the right to object to the processing of your data in certain circumstances.
                            </li>
                        </ul>
                        <p className={styles.contactInfo}>
                            To exercise any of these rights, please contact us at
                            <a href="mailto:hiringportal@gmail.com" className={styles.emailLink}> hiringportal@gmail.com</a>.
                        </p>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>5. Data Security</h2>
                    <p className={styles.sectionDescription}>
                        We take the security of your personal information seriously and use appropriate measures to protect it. However, please note that no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
                    </p>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>6. Upcoming Features</h2>
                    <p className={styles.sectionDescription}>
                        We are continually working to improve our platform and are excited to announce the following upcoming features:
                    </p>
                    <ul className={styles.infoList}>
                        <li><strong>Interview Scheduling:</strong> Real-time video interviews using WebRTC.</li>
                        <li><strong>Advanced Search Filters:</strong> Filter jobs by location, experience, and more.</li>
                        <li><strong>Real-time Notifications:</strong> Get updates for job applications, interviews, etc.</li>
                    </ul>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>7. Changes to This Privacy Policy</h2>
                    <p className={styles.sectionDescription}>
                        We may update this privacy policy from time to time. Any changes will be posted on this page, and we will notify you of significant changes by email or via a notification on the platform.
                    </p>
                </div>

                <p className={styles.lastUpdated}>Last updated: October 11, 2024</p>
            </section>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
