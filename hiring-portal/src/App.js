import logo from './assests/logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './Components/Homepage';
import HeroSection from './Components/HeroSection';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  const [test, setTest] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobcard' element={<Jobpage />} />
        <Route path="/job/:id" element={<Job />} />
        <Route path="/owner" element={<Employer />} />
        <Route path="/ownerside" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/postjob" element={<JobPostForm />} />
        <Route path='/about' element={<About />} />
        <Route path="/company" element={<CompanyRegistration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/uploadedjobs' element={<UploadedJobs />} />
        <Route path='/code/:assessmentId' element={<Coding />} />
        <Route path='/manage-assesment/:jobId' element={<CreateAssessment />} />
        <Route path="/managejobs/:jobId" element={<ManageJobs />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path='/shortlist/:jobId' element={<Shortlist />} />
        <Route path='/assessment-results/:jobId' element={<AssessmentResults />} />
        <Route path='/assessment-results/result/:assessmentId' element={<AssessmentResultDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
