import React from "react"
import { enableScreens } from "react-native-screens"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import Thunk from "redux-thunk"
import AsyncStorage from "@react-native-community/async-storage"
import { persistStore, persistReducer } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import { default as theme } from "../theme/theme.json"
import { default as mapping } from "../mapping.json"
import fetchFonts from "./general/fetchFonts"
import LoadingScreen from "./screens/LoadingScreen"
import NavigationConatiner from "./NavigationContainer"
import productReducer from "./store/reducers/products"
import authReducer from "./store/reducers/auth"

enableScreens()

const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  products: productReducer,
  authentications: authReducer
})

const presistedReducer = persistReducer(persistConfig, rootReducer)

const store = new createStore(presistedReducer, applyMiddleware(Thunk))
const persistor = persistStore(store)

export default class MainApp extends React.Component {
  state = {
    appLoaded: false
  }

  async componentDidMount() {
    await fetchFonts()
    this.setState({ appLoaded: true })
  }

  render() {
    return this.state.appLoaded ? (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            {...eva}
            theme={{ ...eva.light, ...theme }}
            customMapping={mapping}>
            <NavigationConatiner />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    ) : (
      <LoadingScreen />
    )
  }
}
