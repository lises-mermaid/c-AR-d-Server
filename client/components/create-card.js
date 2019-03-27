import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllCardTemplatesThunk} from '../store'
import {VideoUpload, CardTemplates, CardMessage, ConfirmCard} from '.'
import {createNewCardThunk} from '../store'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

class CreateCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardTemplate: {},
      message: '',
      video: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getAllCardTemplates()
    this.setState({
      cardTemplate: this.props.cardTemplate,
      message: this.props.message,
      video: this.props.video
    })
  }

  selectCardTemplate(newCardTemplate) {
    this.setState({...this.state, cardTemplate: newCardTemplate})
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({...this.state, message: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const cardData = new FormData()
    cardData.append('cardTemplateId', this.state.cardTemplate.id)
    cardData.append('message', this.state.message)
    cardData.append('video', this.state.video)
    this.props.confirmCard(cardData)
  }

  render() {
    return (
      <div>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="select-template"
        >
          <Row>
            <Col sm={3}>
              <Nav variant="tabs" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="select-template">
                    Choose Your Card
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="write-message">
                    Write Your Message
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="upload-video">Upload Your Video</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="confirm">Review</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="select-template">
                  <CardTemplates cardTemplates={this.props.cardTemplates} />
                </Tab.Pane>
                <Tab.Pane eventKey="write-message">
                  <CardMessage />
                </Tab.Pane>
                <Tab.Pane eventKey="upload-video">
                  <VideoUpload />
                </Tab.Pane>
                <Tab.Pane eventKey="confirm">
                  <ConfirmCard />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cardTemplates: state.card.cardTemplates,
  cardTemplate: state.card.newCardTemplate,
  message: state.card.newCardMessage,
  video: state.card.newCardVideo
})

const mapDispatchToProps = dispatch => ({
  getAllCardTemplates: () => dispatch(getAllCardTemplatesThunk()),
  confirmCard: data => dispatch(createNewCardThunk(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard)
