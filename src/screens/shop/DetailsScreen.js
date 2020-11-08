import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Button
} from "@ui-kitten/components"

import { CartIcon, ToCartIcon } from "../../components/Icons"
import ProductDetailView from "../../containers/ProductDetailView"

const BackIcon = props => <Icon {...props} name='arrow-back' />

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const navigateCart = () => {
    navigation.navigate("Cart")
  }

  const CartAction = () => (
    <TopNavigationAction icon={CartIcon} onPress={navigateCart} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductDetailView item={item} />
      <TopNavigation
        title={null}
        alignment='center'
        accessoryLeft={BackAction}
        accessoryRight={CartAction}
        style={styles.topNavigation}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topNavigation: {
    backgroundColor: "transparent",
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0
  }
})

export default DetailsScreen
