import React from 'react'
import {getCartThunk, deleteOrderThunk, clearCartThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CartView extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCartThunk()
  }
  render() {
    function total(arr) {
      let sumTotal = 0
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i]
        let sum = obj.price * obj.quantity
        sumTotal += sum
      }
      return sumTotal
    }
    return (
      <div id="cart-view">
        <h2>Your Shopping Cart</h2>
        {this.props.order.map((cupcakeObj, i) => (
          <div key={i} className="single-cupcake-order">
            <img className="group-cupcake-image" src={cupcakeObj.imageUrl} />
            <div>
              <p> Name: {cupcakeObj.name} </p>
              <p> Quantity: {cupcakeObj.quantity} </p>
              <button
                type="submit"
                className="nav-button"
                onClick={() => this.props.deleteOrderThunk(cupcakeObj.id)}
              >
                Remove Order
              </button>
            </div>
            <div>
              {' '}
              <p> Price: {cupcakeObj.price}</p>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="nav-button"
          onClick={() => this.props.clearCartThunk()}
        >
          Empty Cart
        </button>
        <h3 id="total">Your Total: ${total(this.props.order)} </h3>

        {this.props.order.length > 0 && (
          <div>
            <br />
            <Link to="/checkout">
              <button type="button" className="nav-button">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state,
    order: state.cart.myOrder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCartThunk: () => dispatch(getCartThunk()),
    deleteOrderThunk: id => dispatch(deleteOrderThunk(id)),
    clearCartThunk: () => dispatch(clearCartThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartView)
