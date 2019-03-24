import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class VideoUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadStatus: false
    }
    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage(evt) {
    evt.preventDefault()
    const data = new FormData()
    data.append('file', this.uploadInput.files[0])
    data.append('filename', this.fileName.value)
  }

  render() {
    return (
      <div>
        <h3>Upload a video</h3>
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input
              ref={ref => {
                this.uploadInput = ref
              }}
              type="file"
            />
          </div>
          <br />
          <div className="form-group">
            <input
              className="form-control"
              ref={ref => {
                this.fileName = ref
              }}
              type="text"
              placeholder="Optional name for the file"
            />
          </div>
          <br />
          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, null)(VideoUploader)

VideoUploader.propTypes = {
  uploadStatus: PropTypes.bool.isRequired
}
