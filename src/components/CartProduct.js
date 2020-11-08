import React from "react"
import { Layout, Text, Card, Button } from "@ui-kitten/components"
import { Alert, Image, StyleSheet } from "react-native"

import { dimensions } from "../constants"
import { PlusIcon, MinusIcon, KittenIcon } from "../components/Icons"

const CartProduct = props => {
  const onPressItem = () => {
    props.onSelect(props.item)
  }

  const reduceItem = () => {
    props.onRemove(props.item)
  }

  const addItem = () => {
    props.onAdd(props.item)
  }

  const deleteItem = () => {
    Alert.alert("Are you sure?", "Do you really want to delete this item", [
      { text: "No" },
      { text: "Yes", onPress: () => props.onDelete(props.item) }
    ])
  }

  const editItem = () => {
    props.onEdit(props.item)
  }

  const OptionContainer = () =>
    props.showOptions ? (
      <Layout style={styles.optionView}>
        <Button
          appearance='ghost'
          status='basic'
          style={styles.addButton}
          accessoryLeft={MinusIcon}
          onPress={reduceItem}></Button>
        <Text>{props.item.quantity}</Text>
        <Button
          appearance='ghost'
          status='basic'
          style={styles.addButton}
          accessoryLeft={PlusIcon}
          onPress={addItem}></Button>
      </Layout>
    ) : (
      <Layout style={styles.optionView}>
        <Text appearance='hint'>× {props.item.quantity}</Text>
      </Layout>
    )

  const AdminOptions = () => (
    <Layout style={styles.optionView}>
      <Button
        appearance='ghost'
        status='basic'
        onPress={editItem}
        accessoryLeft={props => (
          <KittenIcon {...props} name='edit-outline' />
        )}></Button>
      <Button
        appearance='ghost'
        status='basic'
        onPress={deleteItem}
        accessoryLeft={props => (
          <KittenIcon {...props} name='trash-outline' />
        )}></Button>
    </Layout>
  )

  return (
    <Card appearance='filled' style={styles.card} onPress={onPressItem}>
      <Layout style={styles.container}>
        <Image source={{ uri: props.item.imageUrl }} style={styles.image} />
        <Layout style={styles.textView}>
          <Text numberOfLines={2} style={styles.nameText}>
            {props.item.name}
          </Text>
          <Text category='primary' style={styles.priceText}>
            ${props.item.price}
          </Text>
        </Layout>
        {props.isAdmin ? <AdminOptions /> : <OptionContainer />}
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
  container: {
    width: dimensions.WIN_WIDTH * 0.9,
    flexDirection: "row",
    marginHorizontal: -12,
    backgroundColor: "transparent"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5
  },
  textView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  nameText: {
    fontWeight: "bold"
  },
  priceText: {},
  optionView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  addButton: {}
})

export default CartProduct
