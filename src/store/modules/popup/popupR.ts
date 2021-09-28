import { PropTypes } from "@material-ui/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopupType } from "../../../components/popup/PopupType";

const name = "popup";

export interface IPopupState {
  isPopup: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popupVo?: IPopup<any>;
}

/**
 * 팝업 버튼을 설정하기 위한 값
 */
export interface IButton {
  text: string;
  color?: PropTypes.Color;
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
}

/**
 * 팝업 데이터
 */
export interface IPopup<T> {
  type: PopupType;
  title?: string;
  width?: number;
  data?: T;
  isClose?: boolean;
  buttons?: Array<IButton>;
  onResult?: (item: IButton) => Promise<void>;
}

const initialState: IPopupState = {
  isPopup: false,
  popupVo: undefined,
};

const popupSlice = createSlice({
  name,
  initialState,
  reducers: {
    popupOpen<T>(state: IPopupState, action: PayloadAction<IPopup<T>>) {
      return { ...state, isPopup: true, popupVo: action.payload };
    },
    popupClose(state: IPopupState) {
      return { ...state, isPopup: false, data: undefined };
    },
    Open_alert(state: IPopupState, action: PayloadAction<string>) {
      // 임시 경고 팝업
      return { ...state, isPopup: true, message: action.payload };
    },
  },
});

export const POPUP_OPEN: string = popupSlice.actions.popupOpen.type;
export const POPUP_CLISE: string = popupSlice.actions.popupClose.type;
export const ALERT: string = popupSlice.actions.Open_alert.type;
/**
 * CSR 일때 접근하기 위한 action
 */
export const { popupOpen, popupClose, Open_alert } = popupSlice.actions;
export default popupSlice.reducer;
