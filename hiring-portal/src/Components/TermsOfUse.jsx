import React from 'react';
import styles from '../CSS/TermsOfUse.module.css'
import Navbar from './Navbar';
import Footer from './Footer';

const TermsOfUse = () => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.heading}>Terms of Use for HireHub</h1>

                    {/* Acceptance of Terms */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>1. Acceptance of Terms</h2>
                        <p className={styles.text}>
                            By accessing or using the services provided by HireHub, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our services. This agreement is made between you, the user, and HireHub, and is governed by the applicable laws.
                        </p>
                    </section>

                    {/* User Obligations */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>2. User Obligations and Responsibilities</h2>
                        <p className={styles.text}>Users must:</p>
                        <ul className={styles.list}>
                            <li>Use the platform for lawful and constructive purposes only, whether as a job seeker, employer, or admin.</li>
                            <li>Provide accurate information when creating an account, applying for jobs, or posting job listings.</li>
                            <li>Respect the intellectual property rights of others, including coding assessments and other content on the platform.</li>
                        </ul>
                        <p className={styles.text}>Users are prohibited from:</p>
                        <ul className={styles.list}>
                            <li>Posting or sharing content that is illegal, harmful, or offensive.</li>
                            <li>Interfering with the functionality of the platform, including job postings, assessments, or account management.</li>
                        </ul>
                    </section>

                    {/* Intellectual Property Rights */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>3. Intellectual Property Rights and Ownership</h2>
                        <ul className={styles.list}>
                            <li>All content, trademarks, and intellectual property related to HireHub are owned by the platform or its licensors.</li>
                            <li>Reproduction, distribution, or creation of derivative works from any content without prior written consent is prohibited.</li>
                        </ul>
                    </section>

                    {/* Limitation of Liability */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>4. Limitation of Liability</h2>
                        <ul className={styles.list}>
                            <li>HireHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to lost opportunities, job applications, or coding assessments.</li>
                            <li>This includes, but is not limited to, loss of profits, data, or goodwill.</li>
                        </ul>
                    </section>

                    {/* Indemnification */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>5. Indemnification</h2>
                        <ul className={styles.list}>
                            <li>You agree to indemnify and hold harmless HireHub from any claims, damages, losses, liabilities, and expenses arising from your use of the services, job postings, coding assessments, or violation of these Terms.</li>
                        </ul>
                    </section>

                    {/* Termination Clause */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>6. Termination Clause</h2>
                        <ul className={styles.list}>
                            <li>HireHub reserves the right to terminate or suspend your account and access to services at any time without notice, especially for conduct that violates these Terms or is harmful to other users, the platform, or third parties.</li>
                        </ul>
                    </section>

                    {/* Governing Law */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>7. Governing Law and Jurisdiction</h2>
                        <ul className={styles.list}>
                            <li>These Terms shall be governed by and construed in accordance with the laws applicable in your jurisdiction.</li>
                            <li>Any disputes arising from these terms will be resolved in the courts of your jurisdiction.</li>
                        </ul>
                    </section>

                    {/* Modification of Terms */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>8. Modification of Terms</h2>
                        <ul className={styles.list}>
                            <li>HireHub reserves the right to modify these Terms at any time.</li>
                            <li>Users will be notified of significant changes via the website or email.</li>
                            <li>Continued use of the services after modifications constitutes acceptance of the new Terms.</li>
                        </ul>
                    </section>

                    {/* Legal Compliance */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>9. Legal Compliance and User Responsibility</h2>
                        <ul className={styles.list}>
                            <li>Users agree to comply with all applicable laws and regulations related to job applications, employment, and online content.</li>
                        </ul>
                    </section>

                    {/* Dispute Resolution */}
                    <section className={styles.section}>
                        <h2 className={styles.subheading}>10. Dispute Resolution</h2>
                        <ul className={styles.list}>
                            <li>Any disputes arising out of or relating to these Terms of Use shall be resolved through amicable negotiations.</li>
                            <li>If a resolution cannot be reached, the dispute will be referred to mediation as a first step.</li>
                            <li>If mediation fails, the dispute shall be settled by binding arbitration in accordance with the Arbitration and Conciliation Act, applicable in your jurisdiction.</li>
                            <li>The arbitration proceedings shall be conducted in the language specified by the arbitration body.</li>
                            <li>Each party shall bear its own costs incurred during the arbitration process.</li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />

        </>
    );
};

export default TermsOfUse;
