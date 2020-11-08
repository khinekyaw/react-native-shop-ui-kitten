import React from "react"
import { Icon } from "@ui-kitten/components"

export const CartIcon = props => (
  <Icon {...props} name='shopping-cart-outline' />
)
export const ToCartIcon = props => (
  <Icon {...props} name='shopping-bag-outline' />
)

export const SaveIcon = props => <Icon {...props} name='save-outline' />
export const PlusOutlineIcon = props => <Icon {...props} name='plus-outline' />
export const MenuIcon = props => <Icon {...props} name='menu-2-outline' />
export const BackIcon = props => <Icon {...props} name='arrow-back' />
export const PlusIcon = props => <Icon {...props} name='plus-square' />
export const MinusIcon = props => <Icon {...props} name='minus-square' />
export const ListIcon = props => <Icon {...props} name='list-outline' />
export const SettingIcon = props => <Icon {...props} name='settings-outline' />
export const CubeIcon = props => <Icon {...props} name='cube-outline' />
export const ArrowDown = props => (
  <Icon {...props} name='arrow-ios-downward-outline' />
)

export const KittenIcon = props => <Icon {...props} name={props.name} />
