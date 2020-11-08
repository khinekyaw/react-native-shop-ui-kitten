import * as Font from "expo-font"

const fetchFonts = () =>
  Font.loadAsync({
    "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf")
  })

export default fetchFonts
