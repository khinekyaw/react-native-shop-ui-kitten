import React, { useCallback } from "react"
import { Image, StyleSheet } from "react-native"
import { Layout, Text, Button } from "@ui-kitten/components"

import ContentFooter from "../components/ContentFooter"
import { ToCartIcon } from "../components/Icons"
import { dimensions } from "../constants"
import { useDispatch } from "react-redux"
import { addToCart, buyNow } from "../store/actions/products"

const ProductDetailView = props => {
  const { item } = props
  const dispatch = useDispatch()

  const onAddToCartHandler = useCallback(() => {
    dispatch(addToCart(item))
  }, [dispatch, item])

  const orderProductHandler = () => {
    dispatch(
      buyNow({
        productList: [{ ...item, quantity: 1 }],
        totalPrice: item.price
      })
    )
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.coverImageView}>
        <Image source={{ uri: item.imageUrl }} style={styles.coverImage} />
      </Layout>
      <Layout style={styles.infoView}>
        <Layout style={styles.infoHeader}>
          <Text category='h6' style={styles.nameText}>
            {item.name}
          </Text>
          <Text category='h6' status='basic' style={styles.priceText}>
            ${item.price}
          </Text>
        </Layout>
        <Layout style={styles.descriptionView}>
          <Text category='p1' appearance='hint'>
            {item.description}
          </Text>
        </Layout>
      </Layout>

      <ContentFooter>
        <Button
          appearance='outline'
          accessoryLeft={ToCartIcon}
          style={styles.cartBtn}
          onPress={onAddToCartHandler}></Button>
        <Button style={styles.buyBtn} onPress={orderProductHandler}>
          BUY NOW
        </Button>
      </ContentFooter>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  coverImageView: {
    width: "100%",
    backgroundColor: "skyblue"
  },
  coverImage: {
    width: "100%",
    height: dimensions.WIN_HEIGHT * 0.45,
    resizeMode: "cover"
  },
  infoView: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 22,
    paddingVertical: 20,
    elevation: 0
  },
  infoHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  nameText: {
    flex: 1,
    fontWeight: "bold",
    marginBottom: 8
  },
  cartBtn: {
    marginEnd: 16
  },
  buyBtn: {
    flex: 1
  }
})

export default ProductDetailView
