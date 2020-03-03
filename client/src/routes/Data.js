import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../Style/Login.css";
import { json } from "body-parser";
import Portfolio from "../Components/Portfolio";

class Data extends React.Component {
  state = {
    isLoading: true,
    data: []
  };
  getUserData = async () => {
    const data = await axios.get("http://localhost:8888/api/data");
    this.setState({ data, isLoading: false });
  };
  async componentDidMount() {
    this.getUserData();
  }

  render() {
    const {
      data: { data },
      isLoading
    } = this.state;
    if (data === undefined) {
      console.log("undefined");
      return <div>Please Wait until data is reached!</div>;
    }
    console.dir(data[0].id);
    return (
      <section class="container">
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
            />
          ))
        )}
      </section>
    );
  }
}

export default Data;
