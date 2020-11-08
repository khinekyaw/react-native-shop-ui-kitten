import React from "react"
import { SafeAreaView } from "react-native"
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import { BackIcon } from "../../components/Icons"
import CartProductListView from "../../containers/CartProductListView"

const CartScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack()
  }

  const navigateDetails = item => {
    navigation.navigate("Details", { item })
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Your Cart'
        alignment='center'
        accessoryLeft={BackAction}
      />
      <CartProductListView onSelect={navigateDetails} />
    </SafeAreaView>
  )
}

export default CartScreen
