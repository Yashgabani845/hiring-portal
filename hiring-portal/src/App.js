import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage';
import HeroSection from './Components/HeroSection';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Jobgrid from './Components/JobGrid';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/jobcard' element={<Jobgrid />}/>
   </Routes>
   </Router>
  );
}

export default App;
