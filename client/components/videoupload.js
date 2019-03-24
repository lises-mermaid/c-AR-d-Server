import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createNewCardThunk} from '../store'

class VideoUploader extends Component {
  constructor(props) {
    super(props)
    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage(evt) {
    evt.preventDefault()
    const data = new FormData()
    data.append('file', this.uploadInput.files[0])
    data.append('filename', this.fileName.value)
    this.props.addVideoToState(
      this.props.cardTemplateId,
      this.props.message,
      data
    )
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
            <button type="submit">Create Card</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cardTemplateId: state.cardTemplateId,
  message: state.message
})

const mapDispatchToProps = dispatch => ({
  createCard: (cardTemplateId, message, video) =>
    dispatch(createNewCardThunk(cardTemplateId, message, video))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoUploader)
