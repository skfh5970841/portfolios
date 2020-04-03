import React, { useState } from "react";
import "../Style/Edit.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
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

const editData = async (id, editImageurl, editName, editContent, props) => {
  const { history } = props;
  
  const editData = await axios.post("http://localhost:8888/api/editdata", {
    id,
    editImageurl,
    editName,
    editContent
  });
  if (editData.data === "success") {
    history.push("/data");
  }
};

function Edit(props){
  const {location} = props;
  const imgUrl = useImgUrlInput("");
  const name = useNameInput("");
  const content = useContentInput("");

  return(
    <>
    {location.states 
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
        <button onClick={()=>editData(location.states.id, imgUrl.imgUrl, name.name, content.content, props)}>Complet</button>
    </div> 
    : <Redirect to="/login"/>}
    </>
  );
}
export default Edit;
/*
class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: true,
      id: 0,
      editImageurl: "",
      editName: "",
      editContent: ""
    };
  }

  editData = async () => {
    const { history } = this.props;
    const { id, editImageurl, editName, editContent } = this.state;
    console.log(id, editImageurl, editName, editContent);
    const editData = await axios.post("http://localhost:8888/api/editdata", {
      id,
      editImageurl,
      editName,
      editContent
    });
    console.log(editData);
    if (editData.data === "success") {
      console.log("editData");
      history.push("/");
    }
  };

  getLoginData = async () => {
    const isLogined = await localStorage.getItem("isLogined");
    return isLogined;
  };

  componentDidMount() {
    const { location, history } = this.props;
    const isLogined = this.getLoginData();
    if (isLogined === true) history.push("/login");
    this.setState({
      isLogined: isLogined
    });
    if (location.states === undefined) {
      history.push("/");
    } else {
      this.setState({
        id: location.states.id
      });
    }
  }

  handleImgUrl = e => {
    var editImageurl = e.target.value;
    this.setState({ editImageurl: editImageurl });
  };

  handleName = e => {
    var editName = e.target.value;
    this.setState({ editName: editName });
  };

  handleContent = e => {
    var editContent = e.target.value;
    this.setState({ editContent: editContent });
  };

  handleCompleteButton = e => {
    this.editData();
  };

  render() {
    //const { location } = this.props;
    //const { isLogined } = this.state;
    return (
      <div>
        {false ? (
          <div>Please Login to Edit data</div>
        ) : (
          <div className="editbox">
            <input
              type="text"
              placeholder="image url"
              className="image_url"
              name="image_url"
              onChange={this.handleImgUrl}
              value={this.state.editImageurl}
            />
            <input
              type="text"
              placeholder="name"
              className="name"
              name="name"
              onChange={this.handleName}
              value={this.state.editName}
            />
            <input
              type="text"
              placeholder="content"
              className="content"
              name="content"
              onChange={this.handleContent}
              value={this.state.editContent}
            />
            <button onClick={this.handleCompleteButton}>Complet</button>
          </div>
        )}
      </div>
    );
  }
}
*/
