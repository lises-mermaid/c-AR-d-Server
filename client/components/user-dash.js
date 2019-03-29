import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import {UserHome, SentCards} from '.'
import {Tab, Row, Col, Nav} from 'react-bootstrap'

const UserDashboard = props => (
  <div>
    <Tab.Container id="left-tabs-example" defaultActiveKey="select-template">
      <Row>
        <Col sm={3}>
          <Nav variant="tabs" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="card-history">Card History</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={props.handleClick}>
              <Nav.Link eventKey="logout">Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="profile">
              <UserHome />
            </Tab.Pane>
            <Tab.Pane eventKey="card-history">
              <SentCards />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(UserDashboard)
