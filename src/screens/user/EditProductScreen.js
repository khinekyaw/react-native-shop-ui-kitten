import React, { useState } from "react"
import { SafeAreaView } from "react-native"
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components"

import { SaveIcon, BackIcon } from "../../components/Icons"
import UserInputsView from "../../containers/UserInputsView"

const EditProductScreen = ({ route, navigation }) => {
  const [saveState, setSaveState] = useState(false)

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const triggerSave = () => {
    setSaveState(true)
  }

  const triggerUnsave = () => {
    setSaveState(false)
  }

  const navigateUserProducts = () => {
    navigation.navigate("UserProducts")
  }

  const SaveEdit = () => (
    <TopNavigationAction icon={SaveIcon} onPress={triggerSave} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={route.params.action || "Edit"}
        alignment='center'
        accessoryLeft={BackAction}
        accessoryRight={SaveEdit}
      />
      <UserInputsView
        product={route.params.product}
        save={saveState}
        onSave={navigateUserProducts}
        unSave={triggerUnsave}
      />
    </SafeAreaView>
  )
}

export default EditProductScreen
