import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  runTransaction,
  where,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { PARTICIPANTS, PARTIES } from "../Constants";
import { ParticipantData } from "../Store/ParticipantReducer";
import { ParticipantItem, ParticipantItemMap } from "../Types";
import { useFocusEffect } from "@react-navigation/native";

type Args = {
  setParticipantItems: React.Dispatch<
    React.SetStateAction<ParticipantItemMap | null>
  >;
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  setLastDoc: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
  >;
};

export const useParticipantsListener = ({
  setParticipantItems,
  lastDoc,
  setLastDoc,
}: Args) => {
  const { id: partyId } = useSelector(
    (state: RootState) => state.party.partyData
  );
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    lastDocRef.current = lastDoc;
  }, [lastDoc]);

  useFocusEffect(
    useCallback(() => {
      if (!partyId) return;

      const participantsRef = collection(db, PARTIES, partyId, PARTICIPANTS);

      const unsubscribe = onSnapshot(participantsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setParticipantItems((prev) => {
            if (prev === null) return prev;

            const participantId = change.doc.id;
            const participant = change.doc.data() as ParticipantData;
            const changeType = change.type;
            const newItem: ParticipantItem = {
              id: participantId,
              name: participant.participantName,
              flagRaised: participant.flag.raised,
              isDisabled: participant.isDisabled,
              status: { status: "active", lastSeen: "" },
            };
            const currLastDoc = lastDocRef.current;

            switch (changeType) {
              case "added":
                if (currLastDoc === null) {
                  prev = { ...prev, [participantId]: newItem };
                } else {
                  const lastParticipant = currLastDoc.data() as ParticipantData;
                  if (
                    participant.participantName.toLowerCase() <=
                    lastParticipant.participantName.toLowerCase()
                  ) {
                    const sorted = Object.entries({
                      ...prev,
                      [participantId]: newItem,
                    }).sort(([, a], [, b]) =>
                      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                    );
                    prev = Object.fromEntries(sorted);
                  }
                }
                break;
              case "modified":
                if (prev && participantId in prev) {
                  prev = { ...prev, [participantId]: newItem };
                }
                break;
              case "removed":
                if (prev && participantId in prev) {
                  delete prev[participantId];
                  prev = { ...prev };

                  if (currLastDoc && currLastDoc.id === participantId) {
                    const removedName =
                      participant.participantName.toLowerCase();

                    const q = query(
                      participantsRef,
                      orderBy("participantName"),
                      orderBy("id"),
                      where("participantName", "<", removedName),
                      limit(1)
                    );

                    getDocs(q)
                      .then((snapshot) => {
                        if (!snapshot.empty) {
                          setLastDoc(snapshot.docs[0]);
                        } else {
                          setLastDoc(null); // If nothing comes before it
                        }
                      })
                      .catch((err) => {
                        console.error(
                          "Failed to update lastDoc after participant removal:",
                          err
                        );
                      });
                  }
                }
                break;
            }

            return prev;
          });
        });
      });

      return () => unsubscribe();
    }, [partyId])
  );
};
