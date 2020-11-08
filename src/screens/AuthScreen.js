import React, { useState } from "react"
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert
} from "react-native"
import { Layout, Button, Icon, Text } from "@ui-kitten/components"
import { StatusBar } from "expo-status-bar"
import UserInput from "../components/UserInput"
import { useDispatch } from "react-redux"
import { login, sigup } from "../store/actions/auth"
import LoadingSpinnerView from "../components/LoadingSpinnerView"

const AuthScreen = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [enableLogin, setEnableLogin] = useState(true)
  const [inputValues, setInputValues] = useState({
    values: {},
    validate: {},
    errorType: {},
    savePressed: false
  })
  const btnTexts = enableLogin ? ["Login", "Sign up"] : ["Sign up", "Login"]

  const getUserInputHandler = inputType => text => {
    let valid = false
    if (text) valid = true
    setInputValues(state => ({
      ...state,
      values: { ...state.values, [inputType]: text },
      validate: { ...state.validate, [inputType]: valid },
      errorType: { ...state.errorType, [inputType]: valid ? "Ok" : null }
    }))
  }

  const handleSignup = async () => {
    Keyboard.dismiss()
    if (inputValues.validate.email && inputValues.validate.password) {
      try {
        await dispatch(sigup(inputValues.values))
      } catch (err) {
        Alert.alert("Error occurred!", err.message, [{ text: "Okey" }])
        setIsLoading(false)
      }
    } else {
      setInputValues({ ...inputValues, savePressed: true })
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    Keyboard.dismiss()
    if (inputValues.validate.email && inputValues.validate.password) {
      try {
        await dispatch(login(inputValues.values))
      } catch (err) {
        Alert.alert("Error occurred!", err.message, [{ text: "Okey" }])
        setIsLoading(false)
      }
    } else {
      setInputValues({ ...inputValues, savePressed: true })
      setIsLoading(false)
    }
  }

  const onSubmitAsync = async () => {
    setIsLoading(true)
    if (enableLogin) await handleLogin()
    else await handleSignup()
  }

  const onSubmitHandler = () => {
    onSubmitAsync()
  }

  const toggleLoginSignup = () => {
    setEnableLogin(!enableLogin)
    setInputValues({ ...inputValues, savePressed: false })
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  )

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior='padding'
        keyboardVerticalOffset={100}>
        <UserInput
          style={styles.marginChild}
          placeholder='Email or username'
          inputName='email'
          autoCapitalize='none'
          inputStates={inputValues}
          getInputHandler={getUserInputHandler}
        />
        <UserInput
          style={styles.marginChild}
          placeholder='Password'
          inputName='password'
          autoCapitalize='none'
          inputStates={inputValues}
          secureTextEntry={secureTextEntry}
          accessoryRight={renderIcon}
          getInputHandler={getUserInputHandler}
        />
        <Button style={styles.btn} size='medium' onPress={onSubmitHandler}>
          {btnTexts[0]}
        </Button>
      </KeyboardAvoidingView>
      <Layout style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={toggleLoginSignup}>
          <Text appearance='hint'>{btnTexts[1]}</Text>
        </TouchableOpacity>
      </Layout>
      {isLoading ? <LoadingSpinnerView style={styles.loading} /> : null}
      <StatusBar style='auto' hidden={true} />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 18
  },
  marginChild: {
    marginVertical: 2
  },
  btn: {
    marginTop: 10
  },
  loading: {
    height: "100%",
    position: "absolute"
  }
})

export default AuthScreen
