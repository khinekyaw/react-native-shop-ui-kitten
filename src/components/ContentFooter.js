import React from "react"
import { StyleSheet } from "react-native"
import { Layout } from "@ui-kitten/components"

const ContentFooter = props => (
  <Layout style={[styles.container, { ...props.style }]}>
    {props.children}
  </Layout>
)

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row"
  }
})

export default ContentFooter
