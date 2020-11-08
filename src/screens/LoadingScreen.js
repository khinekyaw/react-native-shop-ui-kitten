import React from "react"
import { View, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"

const LoadingScreen = () => (
  <View style={styles.container}>
    <StatusBar style='auto' hidden={true} />
  </View>
)

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "skyblue"
  }
})
