import {
  DrawerAppBar,
  HiddenItems,
  ParticipantListItem,
} from "@/app/Components";
import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import {
  addMockParticipants,
  fetchParticipantsBatch,
} from "@/app/Firebase/FirestoreService";
import { AppError } from "@/app/Firebase/Types";
import {
  isEqual,
  useParticipantPresence,
  useParticipantsListener,
} from "@/app/Hooks";
import { RootState } from "@/app/Store/Store";
import { ParticipantItem, ParticipantItemMap } from "@/app/Types";
import { useFocusEffect } from "@react-navigation/native";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";

export default function ViewParticipantsScreen() {
  const insets = useSafeAreaInsets();

  //cause FlatList onEndReached is annoying, I need this ref to keep track of whether
  //this current screen is actually in focus since onEndReached triggers upon leaving the screen
  const focusedRef = useRef(true);

  const [participants, setParticipants] = useState<ParticipantItemMap | null>(
    null
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const BATCH_SIZE = 50;
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { id: partyId } = useSelector(
    (state: RootState) => state.party.partyData
  );
  const { setToastMessage } = useLoadingToast();
  //   const { participantStatusMap } = useParticipantPresence();
  const { presenceCheck } = useParticipantPresence(setParticipants);
  useParticipantsListener({
    setParticipantItems: setParticipants,
    lastDoc,
    setLastDoc,
  });

  useFocusEffect(
    useCallback(() => {
      if (!partyId) return;

      focusedRef.current = true;
      console.log("useFocusEffect: loadMoreParticipants");
      loadMoreParticipants();

      // addMockParticipants(partyId, 200).then(() => {
      //   loadMoreParticipants();
      // });

      return () => {
        setParticipants(null);
        setLastDoc(null);
        setHasMore(true);
        setIsLoadingMore(false);
        focusedRef.current = false;
        console.log("focusEffect cleanup");
      };
    }, [partyId])
  );

  //   const loadMoreItems = async () => {
  //     if (isLoadingMore || !hasMore) return;
  //     setIsLoadingMore(true);

  //     setTimeout(() => {
  //       const skip = data.length;
  //       const nextBatch: ParticipantItem[] = [];

  //       for (let i = skip; i < skip + BATCH_SIZE && i < 120; ++i) {
  //         nextBatch.push({
  //           id: `id-${i + 1}`,
  //           name: `Mock participant ${i + 1}`,
  //         });
  //       }

  //       setData((prev) => [...prev, ...nextBatch]);
  //       setHasMore(skip + BATCH_SIZE < 120);
  //       setIsLoadingMore(false);
  //     }, 3000);
  //   };

  //   useEffect(() => {

  //     if (!participantStatusMap || !participants)
  //         return;
  //     // try {
  //     //   setToastMessage("");
  //     //   const updatedParticipants: ParticipantItemMap = { ...participants };
  //     //   Object.entries(participants).forEach(([id, data]) => {
  //     //     if (!(id in participantStatusMap)) {
  //     //       throw new AppError("particpant missing from status map");
  //     //     }
  //     //     updatedParticipants[id].status = participantStatusMap[id];
  //     //   });
  //     //   setParticipants((prev) => ({ ...prev, ...updatedParticipants }));
  //     // } catch (err) {
  //     //   if (err instanceof AppError) {
  //     //     setToastMessage(err.message);
  //     //   }
  //     // }

  //   }, [participants, participantStatusMap]);

  //   const updateParticipantStatuses = (participants: ParticipantItemMap) => {

  //     const updatedParticipants: ParticipantItemMap = { ...participants };
  //     Object.entries(updatedParticipants).forEach(([id, data]) => {
  //       if (participantStatusMap && (id in participantStatusMap)) {
  //         if (!isEqual(updatedParticipants[id].status, participantStatusMap[id])) {
  //             updatedParticipants[id].status = participantStatusMap[id];
  //         }
  //       }
  //     });
  //     setParticipants((prev) => ({ ...prev, ...updatedParticipants }));
  //   }

  const loadMoreParticipants = async () => {
    if (!partyId || !hasMore || isLoadingMore) {
      return;
    }
    setIsLoadingMore(true);
    setToastMessage("");

    try {
      const { participantItems, lastVisible, hasMore } =
        await fetchParticipantsBatch(partyId, BATCH_SIZE, lastDoc);

      setParticipants((prev) => ({ ...prev, ...participantItems }));
      setLastDoc(lastVisible);
      setHasMore(hasMore);
    } catch (err) {
      setToastMessage("Error occured loading participants. Please try again.");
    } finally {
      await presenceCheck();
      setIsLoadingMore(false);
    }
  };

  const refreshParticipants = async () => {
    if (!partyId) return;
    setIsRefreshing(true);

    try {
      const { participantItems, lastVisible, hasMore } =
        await fetchParticipantsBatch(partyId, BATCH_SIZE, null);
      setParticipants(participantItems);
      setLastDoc(lastVisible);
      setHasMore(hasMore); // reset hasMore after refresh
    } catch (err) {
      console.error("Failed to refresh participants:", err);
    } finally {
      await presenceCheck();
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerAppBar title="Participants" />
      <View style={styles.listContainer}>
        <SwipeListView
          data={Object.values(participants ?? {})}
          renderItem={({ item }) => (
            <ParticipantListItem
              name={item.name}
              flagRaised={item.flagRaised}
              id={item.id}
              isDisabled={item.isDisabled}
              status={item.status}
            />
          )}
          renderHiddenItem={({ item }) => <HiddenItems item={item} />}
          recalculateHiddenLayout
          disableRightSwipe
          rightOpenValue={-150}
          stopRightSwipe={-150}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: insets.bottom ? insets.bottom + 20 : 0,
          }}
          refreshing={isRefreshing}
          onRefresh={refreshParticipants}
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (focusedRef.current && !isLoadingMore && hasMore) {
              loadMoreParticipants();
            }
          }}
          ListFooterComponent={
            isLoadingMore ? (
              <Text style={styles.loadingParticipantsText}>
                {`Loading${
                  Object.values(participants ?? {}).length ? " more " : " "
                }participants...`}
              </Text>
            ) : Object.values(participants ?? {}).length ? null : (
              <View>
                <Text style={styles.loadingParticipantsText}>
                  No Participants
                </Text>
              </View>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.drawerBackgroundColor,
    flex: 1,
  },
  listContainer: { padding: scaleWidth(12) },
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
  loadingParticipantsText: {
    color: Colors.culturedWhite,
    textAlign: "center",
    fontSize: fontStyles.xsmall.fontSize,
    marginVertical: scaleHeight(20),
  },
});
