import React from "react";
import "../Style/Edit.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    console.log("handlecontent func");
    this.setState({ editContent: editContent });
  };

  handleCompleteButton = e => {
    this.editData();
  };

  render() {
    const { location } = this.props;
    const { isLogined } = this.state;
    console.log(isLogined);
    return (
      <div>
        {isLogined ? (
          <div>login to edit data</div>
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

export default Edit;
