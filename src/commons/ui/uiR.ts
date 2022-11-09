import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiType } from "./uiVo";
import { IValid } from "./useValid";

const name = "ui";

export type IUiActionValue =
  | undefined
  | string
  | number
  | boolean
  | Array<string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Array<any>
  | FileType
  | { key: string; value: boolean };
/**
 * @param type {@link UiType} 저장될 uitype
 * @param key 고유 키값
 * @param display 화면에 표시될 조건 체크 값
 * @param isAll checkbox 설정시 전체 체크 값
 * @param valid {@link IValid} 조건 값
 * @param value ui에 저장될 값
 */
export interface IUiAction {
  type: UiType;
  key: string;
  display?: boolean;
  isAll?: boolean;
  valid?: IValid<IUiActionValue>;
  value?: IUiActionValue;
}

/**
 * @param inputText
 * @param radioBox
 * @param checkBox
 * @param selectbox
 * @param valid
 * @param validP
 * @param gridCheckbox
 */
export interface IUi {
  inputText: { [key: string]: string | undefined };
  radioBox: { [key: string]: string | number | undefined };
  checkBox: { [key: string]: { [key: string]: boolean } };
  checkBoxGoup: { [key: string]: { isAll: boolean; value: Array<string> } };
  selectbox: { [key: string]: number | string | undefined };
  button: { [key: string]: boolean };
  valid: {
    [key: string]: { display?: boolean; value?: boolean };
  };
  validP: { [key: string]: IValid<IUiActionValue> };
  gridCheckbox: { [key: string]: boolean };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codebook: { [key: string]: Array<any> };
  inputFile: { [key: string]: FileType };
}

export interface FileType {
  filename: string;
  filetype?: string;
  imageData?: string;
  file?: File;
}

function stateChange(state: IUi, data: IUiAction) {
  switch (data.type) {
    case UiType.INPUT_TEXT:
      state.inputText[data.key] = data.value as string;
      break;
    case UiType.VALID:
      state.valid[data.key] = {
        display: data.display as boolean,
        value: data.value as boolean,
      };
      if (data.valid) {
        state.validP[data.key] = data.valid;
      }
      break;
    case UiType.SELECT_BOX:
      state.selectbox[data.key] = data.value as string | number | undefined;
      break;
    case UiType.CHECK_BOX:
      {
        if (state.checkBox[data.key] === undefined) {
          state.checkBox[data.key] = {};
        }
        const k = data.value as { key: string; value: boolean };
        state.checkBox[data.key][k.key] = k.value;
      }
      break;
    case UiType.CHECK_BOX_GROUP:
      state.checkBoxGoup[data.key] = {
        isAll: data.isAll!,
        value: data.value as string[],
      };
      break;
    case UiType.BUTTON:
      state.button[data.key] = data.value as boolean;
      break;
    case UiType.RADIO_BOX:
      state.radioBox[data.key] = data.value as string;
      break;
    case UiType.GRID_CHECKBOX:
      state.gridCheckbox[data.key] = data.value as boolean;
      break;
    case UiType.CODE_BOOK:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.codebook[data.key] = data.value as Array<any>;
      break;
    case UiType.INPUT_FILE:
      switch (typeof data.value) {
        case "string":
          state.inputFile[data.key] = { filename: data.value };
          break;
        default:
          state.inputFile[data.key] = data.value as FileType;
          break;
      }

      break;
    default:
      alert(`isNot type check type :: ${data.type}`);
      break;
  }
}

function stateRemove(state: IUi, action: IUiAction) {
  switch (action.type) {
    case UiType.INPUT_TEXT:
      delete state.inputText[action.key];
      break;
    case UiType.VALID:
      delete state.valid[action.key];
      delete state.validP[action.key];
      break;
    case UiType.SELECT_BOX:
      delete state.selectbox[action.key];
      break;
    case UiType.CHECK_BOX:
      if (state.checkBox[action.key] === undefined) {
        state.checkBox[action.key] = {};
      }
      delete state.checkBox[action.key][action.value as string];
      if (Object.keys(state.checkBox[action.key]).length === 0) {
        delete state.checkBox[action.key];
      }
      break;
    case UiType.CHECK_BOX_GROUP:
      delete state.checkBoxGoup[action.key];
      break;
    case UiType.RADIO_BOX:
      delete state.radioBox[action.key];
      break;
    case UiType.BUTTON:
      delete state.button[action.key];
      break;
    case UiType.GRID_CHECKBOX:
      delete state.gridCheckbox[action.key];
      break;
    case UiType.CODE_BOOK:
      delete state.codebook[action.key];
      break;
    case UiType.INPUT_FILE:
      delete state.inputFile[action.key];
      break;
    default:
      alert(`isNot type check type :: ${action.type}`);
      break;
  }
}

const uiSlice = createSlice({
  name,
  initialState: {
    inputText: {},
    inputFile: {},
    radioBox: {},
    selectbox: {},
    checkBox: {},
    checkBoxGoup: {},
    codebook: {},
    button: {},
    valid: {},
    validP: {},
    gridCheckbox: {},
  } as IUi,
  reducers: {
    rdxInitUi(state: IUi) {
      state.inputText = {};
      state.valid = {};
      state.selectbox = {};
      state.checkBoxGoup = {};
      state.button = {};
      state.radioBox = {};
      state.gridCheckbox = {};
    },
    rdxSetUi(state: IUi, action: PayloadAction<IUiAction>) {
      stateChange(state, action.payload);
    },
    rdxTotalSetUi(state: IUi, action: PayloadAction<IUiAction[]>) {
      action.payload.forEach(item => {
        stateChange(state, item);
      });
    },
    rdxRemoveUi(state: IUi, action: PayloadAction<IUiAction>) {
      stateRemove(state, action.payload);
    },
    rdxTotalRemoveUi(state: IUi, action: PayloadAction<IUiAction[]>) {
      action.payload.forEach(item => {
        stateRemove(state, item);
      });
    },
  },
});

export const { rdxSetUi, rdxRemoveUi, rdxTotalSetUi, rdxTotalRemoveUi } =
  uiSlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default uiSlice.reducer;
