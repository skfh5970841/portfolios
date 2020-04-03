import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import loginicon from "../icon/loginlogo.svg";
import { connect } from "react-redux";
import "../Style/Login.css";
import { actionCreators } from "../store";

const useIdInput = (initialValue, validator) =>{
  const [id, setId] = useState(initialValue);
  const onChange = (event) =>{
    const {
      target : {
        value
      }
    } = event;
    setId(value);
  }
  return {id, onChange};
}

const usePwInput = (initialValue, validator) =>{
  const [pw, setPw] = useState(initialValue);
  const onChange = (event) =>{
    const {
      target : {
        value
      }
    } = event;
    setPw(value);
  }
  return {pw, onChange};
}

const getLoginStatus = async (id, pw, login) => {
  const username = id;
  const password = pw;
  
  console.log(`id: ${username}\npw: ${password}`);
  const loginStatus = await axios.post("http://localhost:8888/api/login/", {
    username: username,
    password: password
  });
  console.log(loginStatus.data);
  if (loginStatus.data === "success") {
    login(true);
    localStorage.setItem("isLogined", true);
  } else {
    login(false);
    localStorage.setItem("isLogined", false);
  }
};

const Login = ({isLogined, login}) => {
  const id = useIdInput("");
  const pw = usePwInput("");

  return (
    <section className="loginbox">
        {isLogined ? (
          <Redirect to={{
            pathname: "/data",
            states: { isLogined: isLogined }
          }}></Redirect> 
        ) : (
          <div className="formbox">
          <h4>Login for Edit or Add Portfolio</h4>
          <img src={loginicon} className="loginicon" alt="defalt" />
          <div className="usernamediv">
            <input
              placeholder="Username"
              name="username"
              type="text"
              className="username"
              {...id}
            />
          </div>
          <div className="passworddiv">
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="password"
              {...pw}
            />
          </div>
          <button className="loginbutton" onClick={() => getLoginStatus(id.id, pw.pw, login)}>
            Login
          </button>
        </div> 
        )}
      </section>
  );
}
function mapStateToProps(state, ownProps) {
  console.log(state);
  return { isLogined : state };
}
function mapDispachToProps(dispach, ownProps){
  return {
      login: (isLogined) => dispach(actionCreators.login(isLogined))
  };
}

export default connect(mapStateToProps, mapDispachToProps)(Login);
