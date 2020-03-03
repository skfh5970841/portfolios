import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../Style/Portfolio.css";

function Portfolio({ id, name, img_url, content }) {
  return (
    <Link
      to={{
        pathname: `/data-details/${id}`,
        states: {
          id,
          name,
          img_url,
          content
        }
      }}
    >
      <session>
        <div className="portfolio">
          <h4>{id}</h4>
          <img src={img_url} alt={name} className="portimg" />
          <h4>{name}</h4>
          <h4>{content}</h4>
        </div>
        <br />
      </session>
    </Link>
  );
}

export default Portfolio;
