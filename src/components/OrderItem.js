import React, { useState } from "react"
import { Layout, Text, Card, Button } from "@ui-kitten/components"
import { StyleSheet, Animated } from "react-native"

import { dimensions } from "../constants"
import { ArrowDown } from "../components/Icons"
import CartProduct from "./CartProduct"

const OrderItem = props => {
  const [showDetail, setShowDetail] = useState(false)
  const { item } = props
  const loop_arr = Array.from(Array(item.productList.length).keys())

  // Animation
  const iconRot = useState(new Animated.Value(0))[0]

  const toggleAnimation = () => {
    if (!showDetail)
      Animated.timing(iconRot, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()
    else
      Animated.timing(iconRot, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start()
  }

  const toggleShowDetail = () => {
    setShowDetail(state => !state)
    toggleAnimation()
  }

  const AnimatedArrowDownIcon = props => (
    <Animated.View
      style={{
        transform: [
          {
            rotate: iconRot.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "180deg"]
            })
          }
        ]
      }}>
      <ArrowDown {...props} />
    </Animated.View>
  )

  const Footer = () => (
    <Layout>
      <Button
        appearance='ghost'
        status='basic'
        accessoryLeft={AnimatedArrowDownIcon}
        onPress={toggleShowDetail}></Button>
      {showDetail ? (
        <Layout>
          {loop_arr.map(idx => (
            <CartProduct
              key={idx}
              item={item.productList[idx]}
              showOptions={false}
              onSelect={props.onSelect}
            />
          ))}
        </Layout>
      ) : null}
    </Layout>
  )

  return (
    <Card status='primary' style={styles.card} footer={Footer}>
      <Layout style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>
          ${item.totalPrice.toFixed(2)}
        </Text>
        <Text appearance='hint'>{item.date}</Text>
      </Layout>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent"
  },
  card: {
    flex: 1,
    width: dimensions.WIN_WIDTH * 0.94,
    marginBottom: 18,
    alignSelf: "center"
  }
})

export default OrderItem
