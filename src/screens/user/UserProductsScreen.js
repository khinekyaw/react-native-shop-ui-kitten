import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import { MenuIcon, PlusOutlineIcon } from "../../components/Icons"
import UserProductListView from "../../containers/UserProductListView"

const UserProductsScreen = ({ navigation }) => {
  const toggleDrawerNavigator = () => {
    navigation.toggleDrawer()
  }

  const navigateDetails = item => {
    navigation.navigate("Details", { item })
  }

  const navigateEditProduct = () => {
    navigation.navigate("EditProduct", { action: "Add" })
  }

  const navigateWithParams = product => {
    navigation.navigate("EditProduct", { product, action: "Edit" })
  }

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleDrawerNavigator} />
  )

  const AddProductAction = () => (
    <TopNavigationAction icon={PlusOutlineIcon} onPress={navigateEditProduct} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Your Products'
        alignment='center'
        accessoryLeft={MenuAction}
        accessoryRight={AddProductAction}
      />
      <UserProductListView
        onSelect={navigateDetails}
        onEdit={navigateWithParams}
      />
    </SafeAreaView>
  )
}

export default UserProductsScreen
