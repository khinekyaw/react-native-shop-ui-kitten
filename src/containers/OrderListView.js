import React, { useEffect, useState } from "react"
import { StyleSheet, FlatList } from "react-native"
import { Layout, Text } from "@ui-kitten/components"
import { useDispatch, useSelector } from "react-redux"

import OrderItem from "../components/OrderItem"
import { fetchOrders } from "../store/actions/products"
import LoadingSpinnerView from "../components/LoadingSpinnerView"

const OrderListView = props => {
  const [isLoading, setIsLoading] = useState(false)
  const orderedProducts = useSelector(state => state.products.orderProducts)
  const dispatch = useDispatch()

  const getOrders = async () => {
    setIsLoading(true)
    await dispatch(fetchOrders())
    setIsLoading(false)
  }

  useEffect(() => {
    getOrders()
  }, [dispatch])

  return (
    <Layout level='3' style={styles.container}>
      {!isLoading ? (
        orderedProducts && orderedProducts.length > 0 ? (
          <FlatList
            style={styles.flatList}
            data={orderedProducts}
            renderItem={itemProps => (
              <OrderItem {...itemProps} onSelect={props.onSelect} />
            )}
            ListFooterComponent={() => (
              <Layout style={styles.listFooter}></Layout>
            )}
          />
        ) : (
          <Text appearance='hint'>No orders</Text>
        )
      ) : (
        <LoadingSpinnerView />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  flatList: {
    width: "100%",
    paddingVertical: 14
  },
  listFooter: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent"
  }
})

export default OrderListView
