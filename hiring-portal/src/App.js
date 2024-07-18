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
   </Routes>
   </Router>
  );
}

export default App;
