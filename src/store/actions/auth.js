export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const LOGOUT = "LOGOUT"

let timer

export const sigup = data => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7GvWIdZJAF3iBVc8NuaBKJruGycRIIaI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true
        })
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = "Something want wrong!"
      if (errorId === "EMAIL_EXISTS")
        message = "This email address is already exist"
      throw new Error(message)
    }

    const resData = await response.json()

    dispatch({
      type: REGISTER
    })
  }
}

export const login = data => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7GvWIdZJAF3iBVc8NuaBKJruGycRIIaI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true
        })
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = "Something want wrong!"
      if (errorId === "INVALID_EMAIL")
        message = "This email address is not valid"
      if (errorId === "INVALID_PASSWORD") message = "This password is not valid"
      throw new Error(message)
    }

    const resData = await response.json()

    dispatch({
      type: LOGIN,
      payload: {
        token: resData.idToken,
        userId: resData.localId,
        expirationDate: Date.now() + parseInt(resData.expiresIn) * 1000
      }
    })
  }
}

export const logout = () => {
  clearLogoutTimer()
  return {
    type: LOGOUT
  }
}

export const authenticate = expirationTime => {
  return dispatch => {
    dispatch(setLogoutTimer(expirationTime))
  }
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}
