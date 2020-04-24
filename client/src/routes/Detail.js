import React from "react";
import "../Style/Detail.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const deleteData = async(id, props) => {
    const { history } = props;

    const deleteData = await axios.post("http://localhost:8888/api/delete", {
        id
    });
    if (deleteData.data === "success") {
        console.log("success");
        history.push("/data");
    } else {
        console.log("failed to delete data");
    }
};

function Detail(props) {
    const { location } = props;
    const isLogined = props.isLogined;

    return (<>
        {
            location.states ? <div className = "center">
            <section className = "detail_box" >
            <span>
            </span> <div className = "imgbox" >
            <img
            src = { location.states.img_url }
            alt = { location.states.name }
            title = { location.states.name }
            className = "indeximg" >
            </img> </div> { " " } <
            br / >
            <span>
            <h3> { location.states.name } </h3> </span> <span>
            <h5> { location.states.content } </h5> 
            </span> {
                isLogined ?
                (<>
                    <Link to = {
                        {
                            pathname: `/edit-data/${location.states.id}`,
                            states: {
                                id: location.states.id,
                                img_url: location.states.img_url,
                                name: location.states.name,
                                content: location.states.content,
                            }
                        }
                    }>
                    Edit </Link>  
                    <button onClick = {
                        () => deleteData(location.states.id, props)
                    } >
                    Delete </button> </>
                ) : ""
            } <div></div>
            </section> </div> :
                <Redirect to = "/" />
        } </>
    );
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return { isLogined: state };
}

export default connect(mapStateToProps, null)(Detail);