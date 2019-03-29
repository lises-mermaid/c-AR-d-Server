import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signUp} from '../store'
import Button from 'react-bootstrap/Button'

const SignUp = props => {
  const {handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name="SignUp">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button type="submit">Sign Up</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.user.error
})

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(signUp(email, username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

/**
 * PROP TYPES
 */
SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
