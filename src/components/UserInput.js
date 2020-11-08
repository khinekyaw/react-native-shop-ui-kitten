import React from "react"
import { StyleSheet } from "react-native"
import { Input } from "@ui-kitten/components"

const UserInput = props => {
  const { inputStates, inputName } = props
  const showStatus = inputStates.savePressed
  let status = ""
  if (showStatus) {
    status = !inputStates.validate[inputName] ? "danger" : "success"
  }

  // console.log(inputStates)

  let error = null
  if (inputStates.errorType)
    if (inputStates.errorType[inputName] === "Ok") {
      error = null
    } else if (!inputStates.errorType[inputName]) {
      error = showStatus
        ? `${"Please enter valid"} ${inputName} ${
            inputName === "email" ? "address" : ""
          }`
        : null
    }

  return (
    <Input
      {...props}
      caption={error}
      status={status}
      value={inputStates.values[inputName]}
      onChangeText={props.getInputHandler(inputName)}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top"
  }
})

export default UserInput
