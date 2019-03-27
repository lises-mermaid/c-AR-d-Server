import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'

class VideoUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {fileURL: ''}
    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage(evt) {
    evt.preventDefault()
    this.props.addVideo('video', this.uploadInput.files[0])
  }
  render() {
    return (
      <div>
        <h3>Upload a video</h3>
        <form onSubmit={this.handleUploadImage}>
          <input
            ref={ref => {
              this.uploadInput = ref
            }}
            type="file"
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
