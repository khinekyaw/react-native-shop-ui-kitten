import React from "react"
import { StyleSheet } from "react-native"
import { Layout, Text, Button } from "@ui-kitten/components"
import { useDispatch, useSelector } from "react-redux"

import { dimensions } from "../constants"
import { deleteUserProduct } from "../store/actions/products"
import SingleRowProductList from "../components/SingleRowProductList"

const UserProductListView = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  const itemInCart = userProducts.length > 0

  const dispatch = useDispatch()

  const userProductDeleteHandler = product => {
    dispatch(deleteUserProduct(product))
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.flatListConatiner}>
        {itemInCart ? (
          <SingleRowProductList
            data={userProducts}
            isAdmin={true}
            onSelect={props.onSelect}
            onEdit={props.onEdit}
            onDelete={userProductDeleteHandler}
          />
        ) : (
          <Text appearance='hint' style={styles.emptyText}>
            Start today! Add more products now.
          </Text>
        )}
      </Layout>
    </Layout>
  )
}
const footer_height = dimensions.WIN_HEIGHT * 0.12
const flat_list_height = dimensions.WIN_HEIGHT - footer_height * 1.62

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  flatListConatiner: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  emptyText: {
    marginTop: flat_list_height / 2
  }
})

export default UserProductListView
