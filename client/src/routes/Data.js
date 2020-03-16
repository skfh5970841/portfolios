import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../Style/Login.css";
import { json } from "body-parser";
import Portfolio from "../Components/Portfolio";
import { HashRouter, Link } from "react-router-dom";

class Data extends React.Component {
  state = {
    isLoading: true,
    data: [],
    isLogined: true
  };
  getUserData = async () => {
    const data = await axios.get("http://localhost:8888/api/data");
    this.setState({ data, isLoading: false });
  };
  
  async componentDidMount() {
    const {location, history} = this.props;
    if(location.states !== undefined)
    {
      console.log(location.states.isLogined);
      this.setState({isLogined : location.states.isLogined});
    }
    this.getUserData();
  }

  render() {
    const {
      data: { data },
      isLoading, 
      isLogined
    } = this.state;
    if (data === undefined) {
      console.log("undefined");
      return <div>Please Wait until data is reached!</div>;
    }
    return (
      <section className="container">
        {isLoading ? (
          <div className="loading">Loading</div>
        ) : (
          data.map(data => (
            <Portfolio
              key={data.id}
              id={data.id}
              name={data.name}
              img_url={data.image_url}
              content={data.content}
              isLogined={isLogined}
            />
          ))
        )}
        <Link to={{
          pathname: "/add-data",
          states : {isLogined}
      }}>Add data</Link>
        <h1></h1>
      </section>
    );
  }
}

export default Data;
