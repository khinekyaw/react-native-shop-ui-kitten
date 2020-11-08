import React from "react"
import { useDispatch, useSelector } from "react-redux"

import AppNavigator from "./AppNavigator"
import AuthScreen from "./screens/AuthScreen"
import { authenticate, logout } from "./store/actions/auth"

const NavigationConatiner = () => {
  const isLogin = useSelector(state => state.authentications.token)
  const expirationDate = useSelector(
    state => state.authentications.expirationDate
  )
  const dispatch = useDispatch()

  if (Date.now() >= expirationDate) {
    dispatch(logout())
  } else if (expirationDate) {
    dispatch(authenticate(expirationDate - Date.now()))
  }

  if (!isLogin) return <AuthScreen />

  return <AppNavigator />
}

export default NavigationConatiner
