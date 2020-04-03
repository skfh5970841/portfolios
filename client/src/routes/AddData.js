import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const useImgUrlInput = (initialValue, validator) =>{
  const [imgUrl, setimgUrl] = useState(initialValue);
  const onChange = (event) =>{
    const {
      target : {
        value
      }
    } = event;
    setimgUrl(value);
  }
  return {imgUrl, onChange};
}
const useNameInput = (initialValue, validator) =>{
  const [name, setname] = useState(initialValue);
  const onChange = (event) =>{
    const {
      target : {
        value
      }
    } = event;
    setname(value);
  }
  return {name, onChange};
}

const useContentInput = (initialValue, validator) =>{
  const [content, setcontent] = useState(initialValue);
  const onChange = (event) =>{
    const {
      target : {
        value
      }
    } = event;
    setcontent(value);
  }
  return {content, onChange};
}
const addData = async (imgUrl, name, content, props) => {
  const { history } = props;
  
  const addData = await axios.post("http://localhost:8888/api/adddata", {
    addImgurl: imgUrl,
    addName: name,
    addContent: content,
  });
  console.log(addData);
  if (addData.data === "success") {
    console.log("addData");
    history.push("/data");
  }
};
function AddData(props){
  //const {location} = props;
  const imgUrl = useImgUrlInput("");
  const name = useNameInput("");
  const content = useContentInput("");
  const {isLogined} = props;

  return (
    <>
    {isLogined 
    ? <div className="editbox">
      <input
        type="text"
        placeholder="image url"
        className="image_url"
        name="image_url"
        {...imgUrl}
      />

      <input
        type="text"
        placeholder="name"
        className="name"
        name="name"
        {...name}
      />
      <input
        type="text"
        placeholder="content"
        className="content"
        name="content"
        {...content}
      />
      <button onClick={() => addData(imgUrl.imgUrl, name.name, content.content, props)}>
        Add Potfolio Data
      </button>
  </div> 
    : <Redirect to="/data"/>}
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return { isLogined : state };
}

export default connect(mapStateToProps, null)(AddData);
