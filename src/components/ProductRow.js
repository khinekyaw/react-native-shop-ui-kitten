import React from "react"
import {
  Layout,
  Text,
  Card,
  Icon,
  TopNavigationAction
} from "@ui-kitten/components"
import { Image, StyleSheet } from "react-native"

import { dimensions } from "../constants"
import { ToCartIcon } from "../components/Icons"

const ProductRow = props => {
  const onPressItem = () => {
    props.onSelect(props.item)
  }

  const addToCart = () => {
    props.onAdd(props.item)
  }

  return (
    <Card appearance='filled' style={styles.card} onPress={onPressItem}>
      <Image source={{ uri: props.item.imageUrl }} style={styles.image} />
      <Layout style={styles.infoContainer}>
        <Layout style={styles.infoTextContainer}>
          <Text numberOfLines={1}>{props.item.name}</Text>
          <Text style={{ fontWeight: "bold" }}>${props.item.price}</Text>
        </Layout>
        <TopNavigationAction icon={ToCartIcon} onPress={addToCart} />
      </Layout>
    </Card>
  )
}

const image_dim = dimensions.WIN_WIDTH * 0.456

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: image_dim,
    height: dimensions.WIN_WIDTH * 0.5,
    resizeMode: "cover",
    borderRadius: 10
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -5
  },
  infoTextContainer: {
    flex: 1,
    backgroundColor: "transparent"
  }
})

export default ProductRow
