import React from "react"
import { StyleSheet } from "react-native"
import { Layout, Text, Button } from "@ui-kitten/components"

const TryAgainView = props => (
  <Layout style={styles.container}>
    <Text appearance='hint' style={{ marginBottom: 10 }}>
      {props.message}
    </Text>
    <Button appearance='outline' onPress={props.onReload}>
      Try again
    </Button>
  </Layout>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default TryAgainView
