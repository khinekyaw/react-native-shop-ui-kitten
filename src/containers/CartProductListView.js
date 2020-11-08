import React, { useCallback, useState } from "react"
import { StyleSheet } from "react-native"
import { Layout, Text, Button } from "@ui-kitten/components"
import { useDispatch, useSelector } from "react-redux"

import ContentFooter from "../components/ContentFooter"
import { dimensions } from "../constants"
import {
  addToCart,
  removeFromCart,
  orderProducts
} from "../store/actions/products"
import SingleRowProductList from "../components/SingleRowProductList"
import LoadingSpinnerView from "../components/LoadingSpinnerView"

const CartProductListView = props => {
  const [isLoading, setIsLoading] = useState(false)
  const cartProducts = useSelector(state => state.products.cartProducts)
  const itemInCart = cartProducts.length > 0
  const totalPrice = cartProducts.reduce(
    (total, item) => item.price * item.quantity + total,
    0
  )

  const dispatch = useDispatch()

  const cartProductRemoveHandler = product => {
    dispatch(removeFromCart(product))
  }

  const cartProductAddHandler = product => {
    dispatch(addToCart(product))
  }

  const orderProductAsync = async () => {
    if (+totalPrice > 0) {
      setIsLoading(true)
      await dispatch(orderProducts({ productList: cartProducts, totalPrice }))
      setIsLoading(false)
    }
  }

  const orderProductsHandler = () => {
    orderProductAsync()
  }

  return (
    <Layout style={styles.container}>
      {!isLoading ? (
        <Layout style={styles.flatListConatiner}>
          {itemInCart ? (
            <SingleRowProductList
              data={cartProducts}
              showOptions={true}
              onSelect={props.onSelect}
              onAdd={cartProductAddHandler}
              onRemove={cartProductRemoveHandler}
            />
          ) : (
            <Text appearance='hint' style={styles.emptyText}>
              Your cart is empty
            </Text>
          )}
        </Layout>
      ) : (
        <LoadingSpinnerView
          style={{
            flex: null,
            height: flat_list_height
          }}
        />
      )}
      <ContentFooter style={styles.footer}>
        {itemInCart ? (
          <Layout style={styles.totalPriceView}>
            <Text style={styles.totalPriceText} appearance='hint'>
              Total price:{" "}
            </Text>
            <Text category='h5' status='basic' style={styles.priceText}>
              ${totalPrice.toFixed(2)}
            </Text>
          </Layout>
        ) : (
          <Layout style={{ marginVertical: 22 }}></Layout>
        )}
        <Button
          style={styles.checkOutBtn}
          disabled={!itemInCart}
          onPress={orderProductsHandler}>
          CHECK OUT
        </Button>
      </ContentFooter>
    </Layout>
  )
}
const footer_height = dimensions.WIN_HEIGHT * 0.2
const flat_list_height = dimensions.WIN_HEIGHT - footer_height * 1.62

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  titleHeader: {
    width: "100%",
    backgroundColor: "skyblue"
  },
  flatListConatiner: {
    height: flat_list_height,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    height: footer_height,
    flexDirection: "column"
  },
  totalPriceText: {
    fontWeight: "bold"
  },
  priceText: {
    marginStart: 20,
    marginTop: -5
  },
  checkOutBtn: {},
  totalPriceView: {
    flexDirection: "row",
    marginBottom: 20
  },
  emptyText: {
    marginTop: flat_list_height / 2
  }
})

export default CartProductListView
