import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'

class VideoUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {fileURL: ''}
    this.handleUploadImage = this.handleUploadImage.bind(this)
    this.stateChanger = this.stateChanger.bind(this)
  }

  handleUploadImage(evt) {
    evt.preventDefault()
    this.props.addVideo('video', this.uploadInput.files[0])
  }

  stateChanger(videoSrc) {
    console.log('state')
    this.setState({fileURL: videoSrc})
  }

  readFile(file) {
    if (file && file.type === 'video/mp4') {
      var reader = new FileReader()

      reader.onload = function(evt) {
        this.stateChanger(evt.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  render() {
    return (
      <div>
        <h3>Upload a video</h3>
        {/* { */}
        {/* this.state.fileURL && this.uploadInput.files[0].lastModified === "video/mp4" ? */}
        <div>
          <video width="320" height="240" controls>
            <source src={this.state.fileURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* :
          <br/>
        } */}
        <form onSubmit={this.handleUploadImage}>
          <input
            ref={ref => {
              this.uploadInput = ref
            }}
            type="file"
            // onChange={() => this.readFile(this.uploadInput.files[0])}
          />
          <br />
          <div>
            <Button type="submit" variant="flat">
              Upload
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default VideoUpload
