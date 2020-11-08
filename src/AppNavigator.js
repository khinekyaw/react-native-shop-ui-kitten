import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Drawer, DrawerItem, IndexPath, Button } from "@ui-kitten/components"

import HomeScreen from "./screens/shop/HomeScreen"
import DetailsScreen from "./screens/shop/DetailsScreen"
import CartScreen from "./screens/shop/CartScreen"
import OrdersScreen from "./screens/shop/OrdersScreen"
import SettingsScreen from "./screens/SettingsScreen"
import { CubeIcon, CartIcon, ListIcon, SettingIcon } from "./components/Icons"
import UserProductsScreen from "./screens/user/UserProductsScreen"
import EditProductScreen from "./screens/user/EditProductScreen"
import { useDispatch } from "react-redux"
import { logout } from "./store/actions/auth"

const { Navigator, Screen } = createStackNavigator()
const UserStack = createStackNavigator()
const MainDrawer = createDrawerNavigator()

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={HomeScreen} />
    <Screen name='Cart' component={CartScreen} />
    <Screen name='Details' component={DetailsScreen} />
  </Navigator>
)

const UserNavigator = () => (
  <UserStack.Navigator headerMode='none'>
    <UserStack.Screen name='UserProducts' component={UserProductsScreen} />
    <UserStack.Screen name='EditProduct' component={EditProductScreen} />
  </UserStack.Navigator>
)

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Button
      size='small'
      appearance='outline'
      style={{ margin: 18 }}
      onPress={onLogout}>
      Logout
    </Button>
  )
}

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    ListFooterComponent={LogoutButton}
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Shop' accessoryLeft={CartIcon} />
    <DrawerItem title='Orders' accessoryLeft={ListIcon} />
    <DrawerItem title='Manage Products' accessoryLeft={CubeIcon} />
    <DrawerItem title='Settings' accessoryLeft={SettingIcon} />
  </Drawer>
)

const MainDrawerNavigator = () => (
  <MainDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <MainDrawer.Screen name='Shop' component={HomeNavigator} />
    <MainDrawer.Screen name='Orders' component={OrdersScreen} />
    <MainDrawer.Screen name='UserTab' component={UserNavigator} />
    <MainDrawer.Screen name='Settings' component={SettingsScreen} />
    <MainDrawer.Screen name='Cart' component={CartScreen} />
    <MainDrawer.Screen name='Details' component={DetailsScreen} />
  </MainDrawer.Navigator>
)

const AppNavigator = () => (
  <NavigationContainer>
    <MainDrawerNavigator />
  </NavigationContainer>
)

export default AppNavigator
