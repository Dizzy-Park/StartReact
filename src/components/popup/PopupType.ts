import { IAbsPopupProps } from "./AbsPopup";
import AlertOrConfirm from "./AlertOrConfirm";

export enum PopupType {
  ALERT = "alert",
  CONFIRM = "confirm",
}

const popups: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.FC<IAbsPopupProps<any>>;
} = {
  [PopupType.ALERT]: AlertOrConfirm,
  [PopupType.CONFIRM]: AlertOrConfirm,
};

export default popups;
