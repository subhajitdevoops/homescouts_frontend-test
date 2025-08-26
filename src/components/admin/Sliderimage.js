import React, { Component } from "react";

export class Sliderimage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      images: [],
    };
    this.fileReader = new FileReader();
  }
  setImages = (e) => {
    e.preventDefault();
    this.setState({ images: [] }); // empty out current images array
    const imageFiles = e.target.files; // document.getElementById("image");
    // You may want to avoid querying the dom yourself, try and rely on react as much as possible
    const filesLength = imageFiles.length; // imageFiles.files.length;
    // const temp = null;
    for (var i = 0; i < filesLength; i++) {
      if (i <= 6) {
        let reader = new FileReader();
        let file = imageFiles[i];
        reader.onloadend = () => {
          this.setState({ images: this.state.images.concat(reader.result) });
        };
        reader.readAsDataURL(file);
      } else {
        alert("chosses less then 6 photo");
      }
    }
  };
  render() {
    let { images } = this.state;
    return (
      <div>
        {images.map((item, index) => (
          <img src={item} style={{ width: "100px", height: "100px" }} />
        ))}
        <form onSubmit={this._handleSubmit}>
          <input id="image" type="file" multiple onChange={this.setImages} />
          {/* <button icon='upload' type="submit" onClick={this._handleSubmit}>Upload Image</button> */}
        </form>
      </div>
    );
  }
}
