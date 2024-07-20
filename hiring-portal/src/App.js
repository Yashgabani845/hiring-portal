import logo from './logo.svg';
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
import CreateTest from './Components/CreateTest';
import TakeTest from './Components/TakeTest';
import JobPostForm from './Components/JobPostForm';
import VideoMeeting from './Components/VideoMeeting';
import CompanyRegistration from './Components/CompanyRegistration';
import Profile from './Components/Profile';
import SignIn from './Components/Signin';
function App() {
  const [test, setTest] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/jobcard' element={<Jobpage />}/>
        <Route path="/job/:id" element={<Job/>} />
        <Route path="/owner" element={<Dashboard/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/createtest" element={<CreateTest setTest={setTest}/>}/>
        <Route path="/taketest" element={<TakeTest test={test}/>}/>
        <Route path="/postjob" element ={<JobPostForm/>}/>
        <Route path="/video" element={<VideoMeeting/>}/>
        <Route path="/company" element={<CompanyRegistration/>}/>  
        <Route path="/profile" element={<Profile/>}/>    
        <Route path="/signin" element={<SignIn/>}/> 
   </Routes>
   </Router>
  );
}

export default App;
