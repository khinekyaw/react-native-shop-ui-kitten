import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import {
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components"

import { MenuIcon } from "../components/Icons"

const SettingsScreen = ({ navigation }) => {
  const toggleDrawerNavigator = () => {
    navigation.toggleDrawer()
  }

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleDrawerNavigator} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Settings'
        alignment='center'
        accessoryLeft={MenuAction}
      />
      <Layout style={styles.container}>
        <Toggle>Dark Mode</Toggle>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 20
  }
})

export default SettingsScreen
