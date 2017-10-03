import React from 'react';
import Cropper from 'react-cropper';

import './css/cropper.min.css';


export default class CropperModal extends React.PureComponent {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const that = this;
    setTimeout(function () {
      that.cropper.setCropBoxData({ width: that.props.cropWidth, height: that.props.cropHeight, left: (512 - that.props.cropWidth / 2), top: (512 - that.props.cropHeight / 2) });
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.returnData) {
      this.props.sendData(this.dataURItoBlob(this.cropper.getCroppedCanvas().toDataURL()));
    }
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  render() {
    const { imageSrc } = this.props;
    const CModal = (

      <div style={{ width: '100%' }}>
        <div className="circle-cropper">
          <Cropper
            zoomTo={0}
            viewMode={3}
            style={{ height: 1024, width: 1024 }}
            aspectRatio={undefined}
            guides={false}
            src={this.state.imageSrc || imageSrc}
            ref={(cropper) => { console.log('Object initialized'); this.cropper = cropper; }}
            center
            cropBoxResizable={false}
            dragMode={'move'}
            zoomable={false}
          />
        </div>
      </div>
    );
    return CModal;
  }
}
