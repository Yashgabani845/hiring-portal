import React from "react";
import "../CSS/navbar.css"
const Navbar = ()=>{
    return(
        <div className="navbar">
        <div className="logo">Hirehub</div>
        <div className="searchdiv"><input type="text" className="search" placeholder="  Search jobs" name="" id="" /></div>
        <div className="icons">
            <div className="home">Home</div>
            <div className="jobs">Jobs</div>
            <div className="aboutus">About</div>
            <div className="login">Login</div>
        </div>
        </div>
    )
}
export default Navbar;