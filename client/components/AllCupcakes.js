import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllCupcakes} from '../store/cupcake'
import Navbar from './navbar'
// import { postCartThunk } from '../store';

class AllCupcakes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getAllCupcakes()
  }

  // handleChange(event) {
  //   console.log('EVENT NAME',event.target.name)
  //   console.log('EVENT VALUE ',event.target.value)
  //   console.log(this.state)
  //   this.setState({
  //     quantity: event.target.value,
  //   })
  //   console.log(this.state)
  // }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.props.postCartThunk(this.state)
  //   this.setState({
  //     quantity: 0,
  //     id: 0
  //   })
  // }

  render() {
    const cupcakes = this.props.cupcakes
    return (
      <div>
        {/* <Navbar /> */}
        <h3>Cupcakes</h3>
        <div id="allCupcakesContainer">
          {cupcakes.map(cupcake => (
            <div key={cupcake.id} className="cupBox">
              <Link to={`/cupcakes/${cupcake.id}`}>
                <img className="cupcakes" src={cupcake.imageUrl} />
                <p> {cupcake.name} </p>
              </Link>
              <p> ${cupcake.price} </p>
              {/* <form onSubmit={this.handleSubmit}>
                <input
                  type="number"
                  name={cupcake.id}
                  min="0"
                  max="100"
                  onChange={this.handleChange}
                  value= {this.state.quantity}
                />
                <button type="submit">Add to Cart</button>
              </form> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cupcakes: state.cupcake.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCupcakes: () => dispatch(getAllCupcakes())
    // postCartThunk: () => dispatch(postCartThunk)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCupcakes)
