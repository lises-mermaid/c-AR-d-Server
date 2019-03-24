import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'

const Signup = props => {
  const {handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name="Signup">
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
          <button type="submit">Sign Up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Sign Up with Google</a>
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
      dispatch(signup(email, username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

/**
 * PROP TYPES
 */
Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
