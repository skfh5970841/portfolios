import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navigation.css";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Navigation({logout}) {
  function clicked() {
    localStorage.setItem("isLogined", false);
    logout(false);
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
function mapDispachToProps(dispach, ownProps){
  return {
      logout: () => dispach(actionCreators.logout(false))
  };
}

export default connect(null, mapDispachToProps)(Navigation);
