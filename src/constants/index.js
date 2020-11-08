import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const dimensions = {
  WIN_WIDTH: width,
  WIN_HEIGHT: height
}
