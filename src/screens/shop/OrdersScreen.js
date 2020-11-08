import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import { MenuIcon } from "../../components/Icons"
import OrderListView from "../../containers/OrderListView"

const OrdersScreen = ({ navigation }) => {
  const toggleDrawerNavigator = () => {
    navigation.toggleDrawer()
  }

  const navigateDetails = item => {
    navigation.navigate("Details", { item })
  }

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleDrawerNavigator} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Your Orders'
        alignment='center'
        accessoryLeft={MenuAction}
      />
      <OrderListView onSelect={navigateDetails} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default OrdersScreen
