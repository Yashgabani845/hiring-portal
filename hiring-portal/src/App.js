import "./App.css";
import React, { useEffect } from "react";
import Homepage from "./Components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Jobpage from "./Components/Jobpage";
import Job from "./Components/Job";
import Dashboard from "./Components/Dashboard";
import AdminDashboard from "./Components/AdminDashboard";
import JobPostForm from "./Components/JobPostForm";
import CompanyRegistration from "./Components/CompanyRegistration";
import Profile from "./Components/Profile";
import SignIn from "./Components/Signin";
import UploadedJobs from "./Components/UploadedJobs";
import Coding from "./Components/Coding";
import CreateAssessment from "./Components/CreateTest";
import ManageJobs from "./Components/Managejob";
import ApplicationForm from "./Components/ApplicationForm";
import Shortlist from "./Components/Shortlist";
import Employer from "./Components/Employer";
import AssessmentResults from "./Components/AssesmentResult";
import AssessmentResultDetail from "./Components/AssessmentResultDetails";
import About from "./Components/About";
import PrivateRoute from "./PrivateRoute";
import TermsAndConditions from "./Components/TermsAndConditions";
import Contactus from "./Components/Contactus";
import BlogPage from "./Components/BlogPage";
import EditProfile from "./Components/EditProfile";
import ResumeAnalyzer from "./Components/ResumeAnalyzer";
import BackToTop from "./Components/BackToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import Error404 from "./Components/Error404";

import CreateBlog from "./Components/CreateBlog";
import ContributorPage from "./Components/ContributorPage";
import { ToastContainer } from "react-toastify";
import BlogDetailPage from "./Components/BlogDetailsPage";
import ResumeScreening from "./Components/ResumeScreening";
import PrivacyPolicy from "./Components/PrivacyPolicy";

import Feedback from "./Components/Feedback";

import TermsOfUse from "./Components/TermsOfUse";
import DiscussionForum from "./Components/DiscussionSection";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1800,
    });
  }, []);

  return (
    <>
      <BackToTop />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobcard" element={<Jobpage />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/owner" element={<Employer />} />
          <Route path="/ownerside" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/postjob" element={<JobPostForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/company" element={<CompanyRegistration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/uploadedjobs" element={<UploadedJobs />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/code/:assessmentId" element={<Coding />} />
          <Route
            path="/manage-assesment/:jobId"
            element={<CreateAssessment />}
          />
          <Route path="/managejobs/:jobId" element={<ManageJobs />} />
          <Route path="/blog" element={<z />} />
          <Route path="/read-more-blog/:id" element={<BlogDetailPage />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/shortlist/:jobId" element={<Shortlist />} />
          <Route path="*" element={<Error404 />} />
          <Route
            path="/assessment-results/:jobId"
            element={<AssessmentResults />}
          />
          <Route
            path="/assessment-results/result/:assessmentId"
            element={<AssessmentResultDetail />}
          />
          {/* <Route path="/ForgotPassword/:email" element={<PasswordResetPage />} /> */}
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route
            path="/create-blog"
            element={<PrivateRoute element={CreateBlog} />}
          />
          <Route path="/contributor" element={<ContributorPage />} />

          <Route path="/resume-screening" element={<ResumeScreening />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/feedback" element={<Feedback />} />

          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/discussionForum" element={<DiscussionForum />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
