import { LOGIN, LOGOUT, REGISTER } from "../actions/auth"

const initState = {
  token: null,
  userId: null,
  expirationDate: 0
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload }
    case LOGOUT:
      return initState
    default:
      return state
  }
}

export default authReducer
