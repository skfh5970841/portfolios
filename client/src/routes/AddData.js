import React from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";

class AddData extends React.Component {
  state = {
    isLogined: true,
    addImgurl: "",
    addName: "",
    addContent: "",
    addImage: ""
  };

  addData = async () => {
    const { history } = this.props;
    const { addImgurl, addName, addContent, addImage } = this.state;
    console.log(addImgurl, addName, addContent, addImage);
    const addData = await axios.post("http://localhost:8888/api/adddata", {
      addImgurl,
      addName,
      addContent,
      addImage
    });
    console.log(addData);
    if (addData.data === "success") {
      console.log("addData");
      history.push("/");
    }
  };

  componentDidMount() {
    const { location, history } = this.props;
    this.setState({
      isLogined: localStorage.getItem("isLogined")
    });
  }

  handleImgUrl = e => {
    var addImgurl = e.target.value;
    this.setState({ addImgurl: addImgurl });
  };

  handleName = e => {
    var addName = e.target.value;
    this.setState({ addName: addName });
  };

  handleContent = e => {
    var addContent = e.target.value;
    this.setState({ addContent: addContent });
  };

  handleCompleteButton = e => {
    this.addData();
  };

  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      addImage: this.state.addImage.concat(pictureFiles)
    });
  };

  render() {
    return (
      <session>
        <div className="editbox">
          <ImageUploader
            withIcon={false}
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
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
          <button onClick={this.handleCompleteButton}>Add Potfolio Data</button>
        </div>
      </session>
    );
  }
}

export default AddData;
