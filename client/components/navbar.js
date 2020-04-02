import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}, props) => {
  return (
    <header role="banner">
      <div id="links-left">
        <Link className="nav-link" to="/">
          CUPCAKES
        </Link>
        <Link className="nav-link" to="/cart">
          CART
        </Link>
      </div>
      <h1 id="title-center">
        <i className="fas fa-crown" /> <span>Best Cupcakes</span>
      </h1>
      <div id="links-right">
        {/* </div> */}
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Link to="/profile" className="nav-button">
              Profile
            </Link>
            <a href="#" onClick={handleClick} className="nav-button">
              Logout
            </a>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="nav-button">
              Login
            </Link>
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
          </>
        )}
      </div>
      {/* <hr /> */}
    </header>
  )
}
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
