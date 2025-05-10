export type ParticipantItem = {
  id: string;
  name: string;
  isDisabled: boolean;
  flagRaised: boolean;
  status: Status;
};

export type ParticipantItemMap = { [id: string]: ParticipantItem };

export type StatusLabel = "active" | "away" | "offline" | "";

export type Status = {
  status: StatusLabel;
  lastSeen: string;
};

export type ParticipantStatusMap = { [id: string]: Status };
