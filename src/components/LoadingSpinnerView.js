import React from "react"
import { StyleSheet } from "react-native"
import { Layout, Spinner } from "@ui-kitten/components"

const LoadingSpinnerView = props => (
  <Layout style={[styles.spinnerContainer, { ...props.style }]}>
    <Spinner />
  </Layout>
)

export default LoadingSpinnerView

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
})
