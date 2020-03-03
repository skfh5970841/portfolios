import React from "react";
import "../Style/Detail.css";
import { Link } from "react-router-dom";

class Detail extends React.Component {
  state = {
    isEditButton: false
  };
  componentDidMount() {
    const { location, history } = this.props;
    if (location.states === undefined) {
      history.push("/");
    }
  }
  render() {
    const { location } = this.props;

    if (location.states) {
      const url = `/edit-data/${location.states.id}`;
      console.log(location.states.img_url);
      return (
        <div className="center">
          <section className="detail_box">
            <span>
              <h3>{location.states.id}</h3>
            </span>
            <div className="imgbox">
              <img
                src={location.states.img_url}
                alt={location.states.name}
                title={location.states.name}
                className="indeximg"
              ></img>
            </div>{" "}
            <br />
            <span>
              <h3>{location.states.name}</h3>
            </span>
            <span>
              <h5>{location.states.content}</h5>
            </span>
            <Link
              to={{
                pathname: url,
                states: {
                  id: location.states.id,
                  img_url: location.states.img_url,
                  name: location.states.name,
                  content: location.states.content
                }
              }}
            >
              Edit
            </Link>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;
