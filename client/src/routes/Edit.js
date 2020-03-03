import React from "react";
import "../Style/Edit.css";
import axios from "axios";

class Edit extends React.Component {
  state = {
    isLogined: true,
    id: 0,
    editImageurl: "",
    editName: "",
    editContent: ""
  };

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

  componentDidMount() {
    const { location, history } = this.props;
    if (location.states === undefined) {
      history.push("/");
    } else {
      this.setState({
        isLogined: localStorage.getItem("isLogined"),
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
    const { location } = this.props;
    console.log(location.states);
    return (
      <session>
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
      </session>
    );
  }
}

export default Edit;
