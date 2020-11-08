import React, { useEffect, useState } from "react"
import { Alert, StyleSheet } from "react-native"
import { Layout } from "@ui-kitten/components"
import { useDispatch } from "react-redux"

import { addUserProduct } from "../store/actions/products"
import UserInput from "../components/UserInput"
import LoadingSpinnerView from "../components/LoadingSpinnerView"

const validateUserInputs = obj => {
  return obj.name && obj.price && obj.imageUrl && obj.description
}

const UserInputsView = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const userProduct = props.product || { price: "" }
  const validate = props.product ? true : false
  let productValidate = {
    name: validate,
    price: validate,
    imageUrl: validate,
    description: validate
  }
  const [inputValues, setInputValues] = useState({
    values: userProduct,
    validate: productValidate,
    savePressed: false
  })

  const getUserInputHandler = inputType => text => {
    let valid = false
    if (text) valid = true
    setInputValues(state => ({
      ...state,
      values: { ...state.values, [inputType]: text },
      validate: { ...state.validate, [inputType]: valid }
    }))
  }

  const showAlert = () => {
    Alert.alert("An error occurred!", error, [{ text: "Okey" }])
  }

  const updateProduct = async () => {
    setIsLoading(true)
    try {
      await dispatch(addUserProduct(inputValues.values))
      props.onSave()
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (error) {
      showAlert()
      setIsLoading(false)
    }
  }, [error])

  useEffect(() => {
    if (props.save) {
      setInputValues(state => ({
        ...state,
        savePressed: true
      }))
      if (validateUserInputs(inputValues.validate)) {
        updateProduct()
      } else {
        props.unSave()
      }
    }
  }, [props.save])

  return (
    <Layout style={styles.container}>
      {!isLoading ? (
        <>
          <UserInput
            style={[styles.input, { marginTop: 15 }]}
            placeholder='Product Name'
            inputName='name'
            inputStates={inputValues}
            getInputHandler={getUserInputHandler}
          />
          <UserInput
            style={styles.input}
            placeholder='Price $'
            inputName='price'
            inputStates={inputValues}
            keyboardType='decimal-pad'
            getInputHandler={getUserInputHandler}
          />
          <UserInput
            style={styles.input}
            placeholder='Image Url'
            inputName='imageUrl'
            inputStates={inputValues}
            getInputHandler={getUserInputHandler}
          />
          <UserInput
            textStyle={styles.multilineInput}
            placeholder='Description'
            inputName='description'
            inputStates={inputValues}
            multiline={true}
            getInputHandler={getUserInputHandler}
          />
        </>
      ) : (
        <LoadingSpinnerView />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15
  },
  input: {
    marginBottom: 15
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top"
  }
})

export default UserInputsView
