import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../Style/Login.css";
import loginicon from "../icon/loginlogo.svg";


class Login extends React.Component {
  state = {
    isLogined: true,
    username: "",
    password: ""
  };

  getLoginStatus = async () => {
    const { username, password } = this.state;
    const loginStatus = await axios.post("http://localhost:8888/api/login/", {
      username: username,
      password: password
    });
    console.log(loginStatus.data);
    if (loginStatus.data === "success") {
      console.log("Login successed");
      this.setState({ isLogined: false });
      localStorage.setItem("isLogined", false);
    } else {
      console.log("Login failed!");
    }
  };

  handleUserName = e => {
    var username = e.target.value;
    this.setState({ username: username });
  };

  handlePassword = e => {
    var password = e.target.value;
    this.setState({ password: password });
  };

  handleEnter = e => {
    this.getLoginStatus();
  };

  async componentDidMount(props) {
    this.setState({ isLogined: localStorage.getItem("isLogined") });
  }

  render(props) {
    const { isLogined } = this.state;
    return (
      <section className="loginbox">
        {isLogined ? (
          <div className="formbox">
          <h4>Login for Edit or Add Portfolio</h4>
          <img src={loginicon} className="loginicon" alt="defalt" />
          <div className="usernamediv">
            <input
              placeholder="Username"
              name="username"
              type="text"
              className="username"
              onChange={this.handleUserName}
              value={this.state.username}
            />
          </div>
          <div className="passworddiv">
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="password"
              onChange={this.handlePassword}
              value={this.state.password}
            />
          </div>
          <button className="loginbutton" onClick={this.handleEnter}>
            Login
          </button>
        </div>
        ) : (
          <Redirect to={{
            pathname: "/data",
            states: { isLogined: isLogined }
          }}></Redirect>
          
        )}
      </section>
    );
  }
}

export default Login;
