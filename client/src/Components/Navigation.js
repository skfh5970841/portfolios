import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navigation.css";

function Navigation() {
  function clicked() {
    localStorage.setItem("isLogined", true);
    console.log("logout button");
  }
  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <span> </span>
      <Link to="/data">Data</Link>
      <span> </span>
      <Link to="/add-data">Add</Link>
      <span> </span>
      <Link to="/login">Login</Link>
      <span> </span>
      <button className="logoutbutton" onClick={clicked}>
        Logout
      </button>
    </div>
  );
}

export default Navigation;
