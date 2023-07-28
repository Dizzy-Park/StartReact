import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AbsPopupType } from "../AbsPopupType";
import type { IPopupDo, IPopupState } from "./absPopupVo";

const name = "popup";

const initialState: IPopupState = {
  isPopup: false,
  popup: {},
  popupAr: [],
  returnData: {},
};

const popupSlice = createSlice({
  name,
  initialState,
  reducers: {
    rdxPopupOpen(state: IPopupState, action: PayloadAction<IPopupDo>) {
      state.isPopup = true;
      const idx = state.popupAr.findIndex(
        item => item.type === action.payload.type
      );
      if (idx !== -1) {
        state.popupAr.splice(idx, 1);
      }
      state.popupAr.push(action.payload);
      state.popup[action.payload.type] = action.payload;
    },
    rdxPopupClose(state: IPopupState, action: PayloadAction<string>) {
      delete state.returnData[action.payload];
      state.popupAr.splice(
        state.popupAr.findIndex(p => p.type === action.payload),
        1
      );
      state.isPopup = state.popupAr.length !== 0;
      delete state.popup[action.payload];
    },
    rdxPopupReset(state: IPopupState) {
      state.isPopup = false;
      state.popup = {};
      state.popupAr = [];
      state.returnData = {};
    },
    rdxSetPopupData(
      state: IPopupState,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<{ type: AbsPopupType | string; value: any }>
    ) {
      state.returnData[action.payload.type] = {
        ...state.returnData[action.payload.type],
        ...action.payload.value,
      };
    },
    rdxChangePopupData(
      state: IPopupState,
      action: PayloadAction<{
        type: AbsPopupType | string;
        key: string;
        index?: string | number;
        fild?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
      }>
    ) {
      if (state.returnData[action.payload.type] === undefined) {
        state.returnData[action.payload.type] = {};
      }
      if (action.payload.index !== undefined) {
        if (action.payload.fild) {
          state.returnData[action.payload.type][action.payload.key][
            action.payload.index
          ][action.payload.fild] = action.payload.value;
        } else {
          state.returnData[action.payload.type][action.payload.key][
            action.payload.index
          ] = action.payload.value;
        }
      } else {
        if (
          state.returnData[action.payload.type][action.payload.key] instanceof
          Array
        ) {
          state.returnData[action.payload.type][action.payload.key].push(
            action.payload.value
          );
        } else {
          state.returnData[action.payload.type][action.payload.key] =
            action.payload.value;
        }
      }
    },
    rdxRemoveOneDepsReturnData(
      state: IPopupState,
      action: PayloadAction<{
        type: AbsPopupType | string;
        key: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
      }>
    ) {
      const originalData =
        state.returnData[action.payload.type][action.payload.key];

      const findIndex = originalData.findIndex(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item === action.payload.value
      );

      if (findIndex > -1) {
        originalData.splice(findIndex, 1);
      }
    },
    rdxRemoveReturnData(
      state: IPopupState,
      action: PayloadAction<{
        type: AbsPopupType | string;
        key: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
        deleteType?: string;
      }>
    ) {
      const originalData =
        state.returnData[action.payload.type][action.payload.key];

      let findIndex;
      if (action.payload.deleteType) {
        findIndex = originalData.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
            item[`${action.payload.deleteType}`] === action.payload.value
        );
      } else {
        findIndex = originalData.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item.id === action.payload.value
        );
      }

      if (findIndex > -1) {
        originalData.splice(findIndex, 1);
      }
    },
    rdxDisabled(
      state: IPopupState,
      action: PayloadAction<{ type: AbsPopupType | string; value: boolean }>
    ) {
      if (
        state !== undefined &&
        state.popup[action.payload.type] !== undefined &&
        state.popup[action.payload.type].data !== undefined &&
        state.popup[action.payload.type].data.buttons !== undefined
      ) {
        state.popup[action.payload.type].data.buttons![0].disabled =
          action.payload.value;
      }
    },
  },
});

export const POPUP_OPEN: string = popupSlice.actions.rdxPopupOpen.type;
export const POPUP_CLISE: string = popupSlice.actions.rdxPopupClose.type;
/**
 * CSR 일때 접근하기 위한 action
 */
export const {
  rdxPopupOpen,
  rdxPopupClose,
  rdxSetPopupData,
  rdxDisabled,
  rdxRemoveOneDepsReturnData,
  rdxRemoveReturnData,
  rdxPopupReset,
  rdxChangePopupData,
} = popupSlice.actions;
export default popupSlice.reducer;
