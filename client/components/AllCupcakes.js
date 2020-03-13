import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllCupcakes} from '../store/cupcake'
import Navbar from './navbar'
import HomeHeader from './homeHeader'

class AllCupcakes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.getAllCupcakes()
  }

  render() {
    const cupcakes = this.props.cupcakes
    return (
      <div className="landing-page">
        <HomeHeader />
        <div id="allCupcakesContainer">
          {cupcakes.map(cupcake => (
            <Link to={`/cupcake/${cupcake.id}`}>
              <div key={cupcake.id} className="cupBox">
                <img src={cupcake.imageUrl} />
                <span className="cupcake-text">
                  <p className="cupcake-title"> {cupcake.name}</p>
                  <p className="cupcake-availability"> Available Daily!</p>
                  <p className="cupcake-description"> {cupcake.description}</p>
                </span>
              </div>
            </Link>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCupcakes)
