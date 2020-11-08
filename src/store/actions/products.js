import getDateYMD from "../../general/getDateYMD"

export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const ORDER_PRODUCTS = "ORDER_PRODUCTS"
export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT"
export const ADD_USER_PRODUCT = "ADD_USER_PRODUCT"
export const BUY_NOW = "BUY_NOW"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const SET_ORDERS = "SET_ORDERS"

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().authentications.userId
    try {
      const response = await fetch(
        `https://reto-shop-app.firebaseio.com/orders/${userId}.json`
      )

      if (!response.ok) {
        throw new Error("Something want wrong!")
      }

      const resData = await response.json()
      console.log(resData)
      const loadedOrders = []

      for (const key in resData) {
        loadedOrders.unshift({ ...resData[key], id: key })
      }

      dispatch({
        type: SET_ORDERS,
        payload: loadedOrders
      })
    } catch (err) {
      throw err
    }
  }
}

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().authentications.userId
    try {
      const response = await fetch(
        "https://reto-shop-app.firebaseio.com/products.json"
      )

      if (!response.ok) {
        throw new Error("Something want wrong!")
      }

      const resData = await response.json()

      const loadedProducts = []

      for (const key in resData) {
        loadedProducts.unshift({ ...resData[key], id: key })
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: {
          products: loadedProducts,
          userProducts: loadedProducts.filter(
            product => product.ownerId === userId
          )
        }
      })
    } catch (err) {
      throw err
    }
  }
}

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    payload: id
  }
}

export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  }
}

export const buyNow = products => {
  return {
    type: BUY_NOW,
    payload: products
  }
}

export const orderProducts = products => {
  const orders = {
    date: getDateYMD(Date.now()),
    productList: [...products.productList],
    totalPrice: products.totalPrice
  }

  return async (dispatch, getState) => {
    try {
      const token = getState().authentications.token
      const userId = getState().authentications.userId
      const response = await fetch(
        `https://reto-shop-app.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orders)
        }
      )

      if (!response.ok) {
        throw new Error("Something want wrong!")
      }

      const resData = await response.json()
      console.log(resData)

      dispatch({
        type: ORDER_PRODUCTS,
        payload: { ...orders, id: resData.name }
      })
    } catch (err) {
      throw err
    }
  }
}

export const deleteUserProduct = products => {
  return async (dispatch, getState) => {
    const token = getState().authentications.token

    try {
      const response = await fetch(
        `https://reto-shop-app.firebaseio.com/products/${products.id}.json?auth=${token}`,
        {
          method: "DELETE"
        }
      )

      dispatch({
        type: DELETE_USER_PRODUCT,
        payload: products
      })
    } catch (err) {
      throw err
    }
  }
}

export const addUserProduct = products => {
  return async (dispatch, getState) => {
    const token = getState().authentications.token
    const userId = getState().authentications.userId
    let link_dist = `https://reto-shop-app.firebaseio.com/products.json?auth=${token}`
    let method = "POST"
    if (products.id) {
      link_dist = `https://reto-shop-app.firebaseio.com/products/${products.id}.json?auth=${token}`
      method = "PATCH"
    }

    try {
      const response = await fetch(link_dist, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...products, ownerId: userId })
      })

      if (!response.ok) {
        throw new Error("Something want wrong!")
      }

      let resData = await response.json()
      if (products.id) resData = { name: products.id }

      dispatch({
        type: ADD_USER_PRODUCT,
        payload: { ...products, id: resData.name, ownerId: userId }
      })
    } catch (err) {
      throw err
    }
  }
}
