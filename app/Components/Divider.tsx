import { View } from "react-native";
import { scaleHeight, scaleWidth } from "../Constants/Dimensions";
import { Colors } from "../Constants/Colors";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const Divider = ({
  width = scaleWidth(290),
  height = scaleHeight(1.5),
  color = Colors.disabledGray,
}: Props) => (
  <View
    style={{
      width: width,
      height: height,
      backgroundColor: color,
    }}
  ></View>
);

export default Divider;
