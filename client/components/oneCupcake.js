import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleCupcake} from '../store/cupcake'
import ls from 'local-storage'
import Navbar from './navbar'
import {postCartThunk} from '../store/cart'

export class SingleCupcake extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      cupcakeId: this.props.match.params.id
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getSingleCupcake(this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let cupcake = this.props.single
    this.props.postThunk(this.state)
    this.setState({
      quantity: 1,
      id: cupcake.id
    })
    throw alert('item added to your cart!')
  }

  render() {
    const cupcake = this.props.single
    return (
      <div id="single-cupcake-container">
        <div id="back-link">
          <i className="fas fa-chevron-left" />
          <Link to="/" className="nav-link">
            Back to Cupcake Flavors
          </Link>
        </div>
        <div id="single-cupcake-content">
          <img src={cupcake.imageUrl} />
          <div id="single-cupcake-side">
            <p className="title">{cupcake.name}</p>
            <p className="cupcake-availability"> {cupcake.description}</p>
            <p> EACH: ${cupcake.price}.75</p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="number"
                name="quantity"
                min="1"
                max="20"
                value={this.state.quantity}
                onChange={this.handleChange}
                className="input-nav-button"
              />
              <button className="nav-button" type="submit">
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    single: state.cupcake.single
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleCupcake: id => dispatch(getSingleCupcake(id)),
    postThunk: obj => dispatch(postCartThunk(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCupcake)
