import React from "react"

import { FlatList } from "react-native-gesture-handler"
import CartProduct from "./CartProduct"

const SingleRowProductList = props => (
  <FlatList
    style={{ width: "100%" }}
    data={props.data}
    renderItem={itemProps => (
      <CartProduct
        {...itemProps}
        isAdmin={props.isAdmin}
        showOptions={props.showOptions}
        onSelect={props.onSelect}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
    )}
  />
)

export default SingleRowProductList
