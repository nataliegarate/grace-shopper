import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {orderHistoryThunk} from '../store/cart'

/**
 * COMPONENT
 */

export class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.orderHistoryThunk()
  }

  render() {
    const email = this.props.email
    return (
      <div id="user-home">
        <h2 className="pink-title">Welcome, {email}</h2>
        <div id="order-history">
          <h4>Your Order History: </h4>
          {this.props.orderHistory.map(order => (
            <div key={order.updatedAt}>
              <p>
                {order.quantity} x {order.name} (${order.quantity * order.price}
                ) purchased on: {order.updatedAt.slice(0, 10)}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    ...state,
    email: state.user.email,
    orderHistory: state.cart.orderHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    orderHistoryThunk: () => dispatch(orderHistoryThunk())
  }
}
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
