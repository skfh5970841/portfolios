import React from "react";
import axios from "axios";
import Data from "./Data";
import { Redirect } from "react-router-dom";

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
      <section class="container">
        {isLogined ? (
          <div>
            <div className="input-field col s12 username">
              <label>Username</label>
              <input
                name="username"
                type="text"
                className="validate"
                onChange={this.handleUserName}
                value={this.state.username}
              />
            </div>
            <div className="input-field col s12">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="validate"
                onChange={this.handlePassword}
                value={this.state.password}
              />
            </div>
            <button onClick={this.handleEnter}>Login</button>
          </div>
        ) : (
          <Redirect to="/data"></Redirect>
        )}
      </section>
    );
  }
}

export default Login;
