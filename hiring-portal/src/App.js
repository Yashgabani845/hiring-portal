import logo from './assests/logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './Components/Homepage';
import HeroSection from './Components/HeroSection';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './Components/Signup';
import Jobpage from './Components/Jobpage';
import Job from './Components/Job';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashboard';
import JobPostForm from './Components/JobPostForm';
import CompanyRegistration from './Components/CompanyRegistration';
import Profile from './Components/Profile';
import SignIn from './Components/Signin';
import UploadedJobs from './Components/UploadedJobs';
import Coding from './Components/Coding';
import CreateAssessment from './Components/CreateTest';
import ManageJobs from './Components/Managejob';
import ApplicationForm from './Components/ApplicationForm';
import Shortlist from './Components/Shortlist';
import Employer from './Components/Employer';
import AssessmentResults from './Components/AssesmentResult';
import AssessmentResultDetail from './Components/AssessmentResultDetails';
import About from './Components/About';
import Contactus from './Components/Contactus';
import BackToTop from "./Components/BackToTop.jsx";
import NotFound from './Components/NotFound.jsx';
function App() {
  const [test, setTest] = useState(null);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/jobcard' element={<Jobpage />} />
        <Route exact path="/job/:id" element={<Job />} />
        <Route exact path="/owner" element={<Employer />} />
        <Route exact path="/ownerside" element={<Dashboard />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/postjob" element={<JobPostForm />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contactus' element={<Contactus />} />
        <Route exact path="/company" element={<CompanyRegistration />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path='/uploadedjobs' element={<UploadedJobs />} />
        <Route exact path='/code/:assessmentId' element={<Coding />} />
        <Route exact path='/manage-assesment/:jobId' element={<CreateAssessment />} />
        <Route exact path="/managejobs/:jobId" element={<ManageJobs />} />
        <Route exact path="/application" element={<ApplicationForm />} />
        <Route exact path='/shortlist/:jobId' element={<Shortlist />} />
        <Route exact path='/assessment-results/:jobId' element={<AssessmentResults />} />
        <Route exact path='/assessment-results/result/:assessmentId' element={<AssessmentResultDetail />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      <BackToTop />
    </Router>
  );
}

export default App;