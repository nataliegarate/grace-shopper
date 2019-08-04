import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const POST_ORDER = 'POST_ORDER'
const GET_ORDER = 'GET_ORDER'
const DELETE_ORDER = 'DELETE-ORDER'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const CLEAR_CART = 'CLEAR_CART'
/**
 * INITIAL STATE
 */
const initialCartstate = {
  newOrder: {quantity: null, cupcakeId: null}, //item added to cart, goes to database
  myOrder: [] //coming from database
}

/**
 * ACTION CREATORS
 */

const clearCart = () => ({
  type: CLEAR_CART
})

const completedOrder = () => ({
  type: COMPLETE_ORDER
})

const postedOrder = order => ({
  type: POST_ORDER,
  order
})

const gotOrder = order => ({
  type: GET_ORDER,
  order
})

const deleteOrder = cupcakeId => ({
  type: DELETE_ORDER,
  cupcakeId
})
/**
 * THUNK CREATORS
 */

export const clearCartThunk = () => async dispatch => {
  try {
    await axios.delete('/api/cart/empty')
    dispatch(clearCart())
  } catch (err) {
    console.log('error clearing cart', err)
  }
}

export const completeOrderThunk = () => async dispatch => {
  try {
    console.log('HELLO')
    await axios.put('/api/cart/checkout')
    dispatch(completedOrder())
  } catch (err) {
    console.log('error completing purchase', err)
  }
}

export const postCartThunk = order => async dispatch => {
  try {
    const res = await axios.post('/api/cart', order)
    const newOrder = res.data
    dispatch(postedOrder(newOrder))
  } catch (err) {
    console.log('posting does not work', err)
  }
}

export const getCartThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    const myOrder = res.data
    dispatch(gotOrder(myOrder))
  } catch (err) {
    console.log('data not fetched >>', err)
  }
}

export const deleteOrderThunk = cupcakeId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${cupcakeId}`)
    dispatch(deleteOrder(cupcakeId))
  } catch (error) {
    console.log('not deleted, try again, error >>', error)
  }
}

/**
 * REDUCER
 */
export default function cartReducer(state = initialCartstate, action) {
  switch (action.type) {
    case POST_ORDER:
      return {...state, newOrder: action.order}
    case GET_ORDER:
      return {...state, myOrder: action.order}
    case DELETE_ORDER:
      return {
        ...state,
        myOrder: state.myOrder.filter(order => order.id !== action.cupcakeId)
      }
    case COMPLETE_ORDER:
      return {...initialCartstate}
    case CLEAR_CART:
      return {...initialCartstate}
    default:
      return state
  }
}
