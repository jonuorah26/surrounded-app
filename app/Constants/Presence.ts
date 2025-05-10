import { StatusLabel } from "../Types";
import { Colors } from "./Colors";

export const PRESENCE_STATUS_COLORS: { [key in StatusLabel]: string } = {
  active: Colors.activeGreen,
  away: Colors.awayYellow,
  offline: Colors.offlineGray,
  "": "",
};
