import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { View, StyleSheet } from "react-native";
import { Avatar, Chip, List, Text } from "react-native-paper";
import Divider from "../../Divider";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { ParticipantItem } from "@/app/Types";
import { PRESENCE_STATUS_COLORS } from "@/app/Constants";

export const ParticipantListItem = ({
  id,
  name,
  flagRaised,
  isDisabled,
  status,
}: ParticipantItem) => (
  <>
    <List.Item
      title={
        <View>
          <Text
            style={{
              color: Colors.culturedWhite,
              fontSize: fontStyles.xsmall.fontSize,
            }}
          >
            {name}
          </Text>
          {status.status !== "" && status.status !== "active" && (
            <Text
              style={{
                color: Colors.secondaryText,
                fontSize: fontStyles.xxsmall.fontSize,
              }}
            >
              {`${status.lastSeen}`}
            </Text>
          )}
        </View>
      }
      description={
        <View style={{ flex: 1, flexDirection: "row", gap: scaleWidth(5) }}>
          {flagRaised && <FlagRaisedChip />}
          {isDisabled && <DisabledChip />}
        </View>
      }
      left={() => (
        <View style={styles.avatarWrapper}>
          <Avatar.Icon
            size={scaleArea(50)}
            icon="account"
            color={Colors.yellow}
            style={{ backgroundColor: Colors.blue }}
          />
          {status.status !== "" && (
            <View
              style={[
                styles.statusDot,
                { backgroundColor: PRESENCE_STATUS_COLORS[status.status] },
              ]}
            />
          )}
        </View>
      )}
      onPress={() => {
        /* Maybe open details */
      }}
    />
    <Divider width={scaleWidth(400)} />
  </>
);

const FlagRaisedChip = () => (
  <View>
    <Chip
      icon={({ size, color }) => (
        <View
          style={{
            marginHorizontal: -scaleWidth(8),
            marginLeft: -scaleWidth(12),
            marginVertical: -scaleHeight(8),
          }}
        >
          <Avatar.Icon
            size={scaleArea(28)}
            icon="flag-outline"
            color={Colors.yellow} // 👈 Your custom color
            style={{ backgroundColor: "transparent" }} // transparent bg if needed
          />
        </View>
      )}
      compact
      style={{
        backgroundColor: Colors.buzzerRedWithOpacity,
        borderColor: Colors.buzzerRed,
        marginTop: scaleHeight(5),
        borderRadius: scaleArea(4),
      }}
      textStyle={{
        color: Colors.culturedWhite,
        marginVertical: -scaleHeight(20),
        marginRight: scaleWidth(4),
      }}
      mode="outlined"
    >
      Flag Raised
    </Chip>
  </View>
);

const DisabledChip = () => (
  <View>
    <Chip
      icon={({ size, color }) => (
        <View
          style={{
            marginHorizontal: -scaleWidth(8),
            marginLeft: -scaleWidth(12),
            marginVertical: -scaleHeight(8),
          }}
        >
          <Avatar.Icon
            size={scaleArea(28)}
            icon="account-off"
            color={Colors.yellow} // 👈 Your custom color
            style={{ backgroundColor: "transparent" }} // transparent bg if needed
          />
        </View>
      )}
      compact
      style={{
        backgroundColor: Colors.buzzerRedWithOpacity,
        borderColor: Colors.buzzerRed,
        marginTop: scaleHeight(5),
        borderRadius: scaleArea(4),
      }}
      textStyle={{
        color: Colors.culturedWhite,
        marginVertical: -scaleHeight(20),
        marginRight: scaleWidth(4),
      }}
      mode="outlined"
    >
      Disabled
    </Chip>
  </View>
);

const styles = StyleSheet.create({
  avatarWrapper: {
    width: scaleArea(50),
    height: scaleArea(50),
  },
  statusDot: {
    position: "absolute",
    bottom: scaleHeight(-1),
    right: scaleHeight(4),
    width: scaleArea(12),
    height: scaleArea(12),
    borderRadius: scaleArea(6),
    borderColor: "white",
  },
});
