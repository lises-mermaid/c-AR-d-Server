import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setNewCardVideo} from '../store'

class VideoUpload extends Component {
  constructor(props) {
    super(props)
    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage(evt) {
    evt.preventDefault()
    this.props.addVideo(this.uploadInput.files[0])
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
          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addVideo: video => dispatch(setNewCardVideo(video))
})

export default connect(null, mapDispatchToProps)(VideoUpload)
