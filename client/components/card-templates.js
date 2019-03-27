import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllCardTemplatesThunk, setNewCardTemplate} from '../store'
import Container from 'react-bootstrap/Container'

class cardTemplates extends Component {
  componentDidMount() {
    this.props.getAllCardTemplates()
  }

  selectCardTemplate(cardTemplate) {
    this.props.chooseCardTemplate(cardTemplate)
  }

  render() {
    return (
      <div>
        <h2>Select A Card</h2>
        <Container fluid="false">
          <div>
            {this.props.cardTemplates.map(cardTemplate => (
              <div
                key={cardTemplate.id}
                onClick={() => this.selectCardTemplate(cardTemplate)}
              >
                <p>{cardTemplate.occasion}</p>
                <img src={cardTemplate.picture} height="140" width="120" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cardTemplates: state.card.cardTemplates
})

const mapDispatchToProps = dispatch => ({
  getAllCardTemplates: () => dispatch(getAllCardTemplatesThunk()),
  chooseCardTemplate: cardTemplate => dispatch(setNewCardTemplate(cardTemplate))
})

export default connect(mapStateToProps, mapDispatchToProps)(cardTemplates)
