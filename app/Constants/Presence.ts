import { StatusLabel } from "../Types";
import { Colors } from "./Colors";

export const PRESENCE_STATUS_COLORS: { [key in StatusLabel]: string } = {
  active: Colors.activeGreen,
  away: Colors.awayYellow,
  offline: Colors.offlineGray,
  "": "",
};

export const ONE_MIN = 60000;
export const ONE_HOUR = ONE_MIN * 60;
export const ONE_DAY = ONE_HOUR * 24;
