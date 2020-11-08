import React from "react"
import { SafeAreaView } from "react-native"
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import ProductListView from "../../containers/ProductListView"
import { CartIcon, MenuIcon } from "../../components/Icons"

const HomeScreen = ({ navigation }) => {
  const navigateDetails = item => {
    navigation.navigate("Details", { item })
  }

  const navigateCart = () => {
    navigation.navigate("Cart")
  }

  const toggleDrawerNavigator = () => {
    navigation.toggleDrawer()
  }

  const CartAction = () => (
    <TopNavigationAction icon={CartIcon} onPress={navigateCart} />
  )

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleDrawerNavigator} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Home'
        alignment='center'
        accessoryRight={CartAction}
        accessoryLeft={MenuAction}
      />
      <ProductListView onSelect={navigateDetails} navigation={navigation} />
    </SafeAreaView>
  )
}

export default HomeScreen
