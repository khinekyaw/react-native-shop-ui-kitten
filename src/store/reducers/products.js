import { DATA } from "../../data/dummy-data"

import {
  ADD_TO_CART,
  ADD_USER_PRODUCT,
  BUY_NOW,
  DELETE_USER_PRODUCT,
  ORDER_PRODUCTS,
  REMOVE_FROM_CART,
  SET_ORDERS,
  SET_PRODUCTS
} from "../actions/products"

import getDateYMD from "../../general/getDateYMD"

const initialState = {
  products: [],
  userProducts: [],
  cartProducts: [],
  orderProducts: []
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartProducts.find(
        product => product.id === action.payload.id
      )
      if (existingItem) {
        const newCartProducts = state.cartProducts.reduce((plist, product) => {
          if (product.id === existingItem.id) {
            const new_product = { ...product, quantity: product.quantity + 1 }
            return [...plist, new_product]
          } else return [...plist, product]
        }, [])
        return {
          ...state,
          cartProducts: newCartProducts
        }
      } else {
        return {
          ...state,
          cartProducts: [
            { ...action.payload, quantity: 1 },
            ...state.cartProducts
          ]
        }
      }
    case REMOVE_FROM_CART:
      const cartProducts = state.cartProducts.reduce((plist, product) => {
        if (product.id !== action.payload.id) return [...plist, product]
        const product_quantity = product.quantity - 1
        if (product_quantity) {
          const reduced_product = { ...product, quantity: product_quantity }
          return [...plist, reduced_product]
        } else return plist
      }, [])
      return { ...state, cartProducts }
    case ORDER_PRODUCTS:
      return {
        ...state,
        cartProducts: [],
        orderProducts: [action.payload, ...state.orderProducts]
      }
    case BUY_NOW:
      return {
        ...state,
        orderProducts: [
          {
            date: getDateYMD(),
            productList: [...action.payload.productList],
            totalPrice: action.payload.totalPrice
          },
          ...state.orderProducts
        ]
      }
    case DELETE_USER_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.payload.id
        )
      }
    case ADD_USER_PRODUCT:
      const newUserProducts = state.userProducts.filter(
        product => product.id !== action.payload.id
      )
      return {
        ...state,
        userProducts: [action.payload, ...newUserProducts]
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        userProducts: action.payload.userProducts
      }
    case SET_ORDERS:
      return {
        ...state,
        orderProducts: action.payload
      }
    default:
      return state
  }
}

export default productReducer
