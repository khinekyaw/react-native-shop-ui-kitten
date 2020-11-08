import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, FlatList, RefreshControl } from "react-native"
import { Layout, Text, useTheme } from "@ui-kitten/components"
import { useDispatch, useSelector } from "react-redux"

import { dimensions } from "../constants"
import ProductRow from "../components/ProductRow"
import LoadingSpinnerView from "../components/LoadingSpinnerView"
import TryAgainView from "../components/TryAgainView"
import { addToCart, fetchProducts } from "../store/actions/products"

const ProductListView = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [error, setError] = useState()
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()

  // Theme
  const theme = useTheme()

  const onAddToCartHandler = item => {
    dispatch(addToCart(item))
  }

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsReloading(true)
    try {
      await dispatch(fetchProducts())
    } catch (err) {
      setError(err)
    }
    setIsReloading(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => setIsLoading(false))
  }, [dispatch, loadProducts])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadProducts)
    return () => {
      if (willFocusSub.remove) willFocusSub.remove()
    }
  }, [loadProducts])

  if (error)
    return (
      <TryAgainView message={"An error occurred!"} onReload={loadProducts} />
    )

  return (
    <Layout level='1' style={styles.container}>
      {!isLoading ? (
        <>
          <Text category='h5' style={styles.title}>
            Our Products
          </Text>
          <FlatList
            refreshControl={
              <RefreshControl
                colors={[theme["color-primary-default"]]}
                refreshing={isReloading}
                onRefresh={loadProducts}
              />
            }
            style={{ paddingHorizontal: 5 }}
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderProps => (
              <ProductRow
                {...renderProps}
                onSelect={props.onSelect}
                onAdd={onAddToCartHandler}
              />
            )}
          />
        </>
      ) : (
        <LoadingSpinnerView
          style={{
            flex: null,
            height: dimensions.WIN_HEIGHT - 120
          }}
        />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginHorizontal: 13,
    paddingBottom: 5
  }
})

export default ProductListView
