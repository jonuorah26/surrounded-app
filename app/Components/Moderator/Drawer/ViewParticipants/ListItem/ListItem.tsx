import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  Avatar,
  Button,
  Chip,
  List,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import Divider from "../../../../Divider";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { ParticipantItem } from "@/app/Types";
import { PRESENCE_STATUS_COLORS } from "@/app/Constants";
import { leaveParty } from "@/app/Firebase/FirestoreService";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/Store";
import { AppError } from "@/app/Firebase/Types";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ListItemModal } from "./ListItemModal";

export const ParticipantListItem = ({
  id,
  name,
  flagRaised,
  isDisabled,
  status,
}: ParticipantItem) => (
  <>
    <List.Item
      style={{ backgroundColor: Colors.drawerBackgroundColor }}
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

export const HiddenItems = ({ item }: { item: ParticipantItem }) => {
  const { id: partyId } = useSelector(
    (state: RootState) => state.party.partyData
  );
  const { setLoadingText, setToastMessage } = useLoadingToast();
  const [modalOpen, setModalOpen] = useState(false);

  const handleRemove = async () => {
    Alert.alert(
      "Alert",
      `Are you sure you want to remove "${item.name}" from the party?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              //console.log("Remove", item.id);
              setLoadingText("Removing participant");
              setToastMessage("");
              await leaveParty(partyId, item.id);
              setToastMessage("Participant removed!");
            } catch (err) {
              if (err instanceof AppError) {
                setToastMessage(err.message);
              } else {
                setToastMessage("Error occured. Failed to remove participant.");
              }
            } finally {
              setLoadingText("");
            }
          },
          style: "destructive",
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const handleMore = () => {
    //console.log("More", item.id);
    setModalOpen(true);
  };

  return (
    <>
      <View style={styles.hiddenActions}>
        <TouchableOpacity
          onPress={handleMore}
          style={[styles.actionButton, styles.more]}
        >
          <Text style={styles.actionText}>More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRemove}
          style={[styles.actionButton, styles.remove]}
        >
          <Text style={styles.actionText}>Remove</Text>
        </TouchableOpacity>
      </View>
      <ListItemModal item={item} open={modalOpen} setOpen={setModalOpen} />
    </>
  );
};

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
  hiddenActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "98%",
    zIndex: 10,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  more: {
    backgroundColor: Colors.blue,
  },
  remove: {
    backgroundColor: Colors.buzzerRed,
  },
  actionText: {
    color: Colors.culturedWhite,
    fontWeight: "bold",
  },
});
