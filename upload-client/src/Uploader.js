import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/App.css';
import CropperModal from './CropperModel';
import Constants from './Constants';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnData: [],
      selectedTab: 0,
      images: []
    }
    this.getCropData = this.getCropData.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.saveFiles = this.saveFiles.bind(this);
    this.onChangeImageSrc = this.onChangeImageSrc.bind(this);
    this.httpResponseHandler = this.httpResponseHandler.bind(this);
  }

  onChangeImageSrc(evt) {
    const self = this;
    if (evt && evt.preventDefault) { evt.preventDefault(); }
    let files;
    if (evt.dataTransfer) {
      files = evt.dataTransfer.files;
    } else if (evt.target) {
      files = evt.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const i = new Image();
      i.onload = function () {
        if (i.width < 1024 || i.height < 1024) {
          console.log(i.width);
          console.log(i.height);
          alert('Minimum image size should be 1024 X 1024');
        } else {
          self.setState({
            imageSrc: reader.result,
            imageEvt: evt,
            file: files[0],
            selectedTab: 1,
            images: [],
            returnData: []
          });
        }
      };
      i.src = reader.result;

    };
    reader.readAsDataURL(files[0]);
  }

  saveFiles(callback) {
    console.log(this.state);
    let formData = new FormData();
    let images = this.state.images;
    images.shift();
    images.forEach((image, index) => {
      formData.append('image', image, `${this.state.file.name}${index}`);
    })
    // Make ajax call
    let filexmlhttp = new XMLHttpRequest();

    if (filexmlhttp) {
      let serverEndPoint =  `${Constants.endpoint}${Constants.uploadURL}`; 
      filexmlhttp.open('POST', serverEndPoint, true);
      filexmlhttp.setRequestHeader("enctype", "multipart/form-data");

      filexmlhttp.addEventListener("load", function () {

        if (filexmlhttp.status < 400) {
          console.log(filexmlhttp.response);
          callback({ success: true, result: filexmlhttp.response });
        }
        else {
          callback({ success: false, code: 500, result: "error" });
        }
      });

      filexmlhttp.addEventListener("error", function () {
        callback({ success: false, code: 500, result: "error" });
      });

      filexmlhttp.addEventListener("abort", function () {
        callback({ success: false, code: 500, result: "error" });
      });

      filexmlhttp.send(formData);
    }
  }

  handleTabClick(selectedTab) {
    this.selectedTab = selectedTab;
    let oldState = this.state;
    oldState.returnData[oldState.selectedTab] = true;
    this.setState(oldState);
  }

  httpResponseHandler(response) {
    if (response.success) {
      this.props.history.push("/view");
    } else {
      alert('Something went wrong while uploading. Please try again')
    }
  }

  getCropData(image) {
    let oldState = this.state;
    oldState.images[oldState.selectedTab] = image;
    oldState.returnData[oldState.selectedTab] = false;
    oldState.selectedTab = this.selectedTab;
    this.setState(oldState, () => {
      if (this.selectedTab === 5) {
        this.saveFiles(this.httpResponseHandler);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <input accept=".jpeg,.png,.jpg," id="avatar" type="file" onChange={this.onChangeImageSrc} />
        {
          this.state.imageSrc && this.state.selectedTab === 1 &&
          <div>
            <h1> Preview 755 * 450 </h1>
            <button className="btn btn-info"
              onClick={() => { this.handleTabClick(2) }}> Next </button>
            <CropperModal imageSrc={this.state.imageSrc}
              cropWidth={755}
              cropHeight={450}
              returnData={this.state.returnData[1]}
              sendData={this.getCropData}
            />
          </div>
        }
        {
          this.state.imageSrc && this.state.selectedTab === 2 &&
          <div>
            <h1> Preview 365 * 450 </h1>
            <button className="btn btn-info"
              onClick={() => { this.handleTabClick(3) }}> Next </button>
            <CropperModal imageSrc={this.state.imageSrc}
              cropWidth={365}
              cropHeight={450}
              returnData={this.state.returnData[2]}
              sendData={this.getCropData}
            />
          </div>
        }
        {
          this.state.imageSrc && this.state.selectedTab === 3 &&
          <div>
            <h1> Preview 365 * 212 </h1>
            <button className="btn btn-info"
              onClick={() => { this.handleTabClick(4) }}> Next </button>
            <CropperModal imageSrc={this.state.imageSrc}
              cropWidth={365}
              cropHeight={212}
              returnData={this.state.returnData[3]}
              sendData={this.getCropData}
            />
          </div>
        }
        {
          this.state.imageSrc && this.state.selectedTab === 4 &&
          <div>
            <h1> Preview 380 * 380 </h1>
            <button className="btn btn-success"
              onClick={() => { this.handleTabClick(5) }}> Save </button>
            <CropperModal imageSrc={this.state.imageSrc}
              cropWidth={380}
              cropHeight={380}
              returnData={this.state.returnData[4]}
              sendData={this.getCropData}
            />
          </div>
        }
        {
          this.state.selectedTab === 5 && <h1> Saving files </h1>
        }
      </div>
    );
  }
}

export default withRouter(Uploader);
