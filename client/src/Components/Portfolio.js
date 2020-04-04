import React from "react";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import "../Style/Portfolio.css";

function Portfolio({ id, name, img_url, content, isLogined }) {
  return (
    <Link
      to={{
        pathname: `/data-details/${id}`,
        states: {
          id,
          name,
          img_url,
          content,
          isLogined
        }
      }}
    >
      <section>
        <div className="portfolio">
          <img src={img_url} alt={name} className="portimg" />
          <h4>{name}</h4>
          <h4>{content}</h4>
        </div>
        <br />
      </section>
    </Link>
  );
}

export default Portfolio;
