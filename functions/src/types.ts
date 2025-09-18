export type FlagSystemOption = "red" | "green" | "";
export type VoteOutThresholdType = "majority" | "all" | "custom" | "";
export type ParticipantInSeat = {
  name: string;
  id: string;
} | null;
export type UserType = "participant" | "moderator" | "";
export type ParticipantSeatData = {
  seatFilled: boolean;
  lastInSeat: ParticipantInSeat;
  lastChangeBy: UserType;
};

export type PartyData = {
  id: string;
  flagSystem: FlagSystemOption;
  flagsRaisedCount: number;
  minParticipants: number;
  maxParticipants: number | null;
  participantCount: number;
  maxSameAsMin: boolean;
  allowParticipantsDuringSession: boolean;

  voteOutThresholdType: VoteOutThresholdType;
  customVoteOutThreshold: number | null;
  partyCode: string;

  isPaused: boolean;
  isStarted: boolean;
  isEnded: boolean;

  participantInSeat: ParticipantSeatData;
  moderatorPushToken: string;
  notifications: PartyNotifications;
};

export type PartyNotifications = {
  thresholdReachedSent: boolean;
};

export type Flag = {
  raised: boolean;
  lastChangeBy: UserType;
};
export type ParticipantData = {
  id: string;
  participantName: string;
  isDisabled: boolean;
  flag: Flag;
  pushToken: string | null;
};

export const PARTIES = "Parties";
export const PARTICIPANTS = "Participants";
export const NOTIFICATIONS = "Notifications";
export const THRESHOLD_NOTIFICATION = "threshold_reached";
