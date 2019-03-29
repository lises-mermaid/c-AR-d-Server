import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import NavbarStyle from 'react-bootstrap/Navbar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <NavbarStyle bg="light" href="#" sticky="top">
        <NavbarStyle.Brand>
          <img
            src="logo.png"
            width="220"
            className="d-inline-block align-top"
            alt="c-AR-d logo"
          />
        </NavbarStyle.Brand>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            {/* <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a> */}
            <Link to="/home">Home</Link>
            {/* <Link to="/cards">Card History</Link> */}
            <Link to="/create">Create A Card</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        )}
        {/* <Link to="/cardtemplates">Card Templates</Link> */}
      </NavbarStyle>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
