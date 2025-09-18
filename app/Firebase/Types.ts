import { ParticipantData } from "../Store/ParticipantReducer";
import { PartyData } from "../Store/PartyReducer";

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}

export interface PartyDbPproperties extends PartyData {
  createdAt: Date;
  moderatorPushToken: string;
  notifications: {
    thresholdReachedSent: boolean;
  };
}

export interface ParticipantDbPproperties extends ParticipantData {
  pushToken: string;
}
