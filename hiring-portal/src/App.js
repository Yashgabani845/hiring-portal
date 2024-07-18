import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage';
import HeroSection from './Components/HeroSection';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Jobpage from './Components/Jobpage';
import Job from './Components/Job';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/jobcard' element={<Jobpage />}/>
        <Route path="/job/:id" element={<Job/>} />
        <Route path="/owner" element={<Dashboard/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>

   </Routes>
   </Router>
  );
}

export default App;
