import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UiType, type IUi, type IUiAction, type FileType } from "./uiVo";
import { isHttp } from "commons/utils";

const name = "ui";

function stateChange(state: IUi, data: IUiAction) {
  switch (data.type) {
    case UiType.INPUT_TEXT:
      if (state.inputText === undefined) {
        state.inputText = {};
      }
      state.inputText[data.key] = data.value as string;
      break;
    case UiType.VALID:
      if (state.valid === undefined) {
        state.valid = {};
      }
      state.valid[data.key] = {
        display: data.display as boolean,
        value: data.value as boolean,
      };
      if (data.valid) {
        if (state.validP === undefined) {
          state.validP = {};
        }
        state.validP[data.key] = data.valid;
      }
      break;
    case UiType.SELECT_BOX:
      if (state.selectbox === undefined) {
        state.selectbox = {};
      }
      state.selectbox[data.key] = data.value as string | number | undefined;
      break;
    case UiType.CHECK_BOX:
      {
        if (state.checkBox === undefined) {
          state.checkBox = {};
        }
        if (state.checkBox[data.key] === undefined) {
          state.checkBox[data.key] = {};
        }
        const k = data.value as { key: string; value: boolean };
        state.checkBox[data.key][k.key] = k.value;
      }
      break;
    case UiType.CHECK_BOX_GROUP:
      if (state.checkBoxGoup === undefined) {
        state.checkBoxGoup = {};
      }
      state.checkBoxGoup[data.key] = {
        isAll: data.isAll!,
        value: data.value as string[],
      };
      break;
    case UiType.BUTTON:
      if (state.button === undefined) {
        state.button = {};
      }
      state.button[data.key] = data.value as boolean;
      break;
    case UiType.RADIO_BOX:
      if (state.radioBox === undefined) {
        state.radioBox = {};
      }
      state.radioBox[data.key] = data.value as string;
      break;
    case UiType.GRID_CHECKBOX:
      if (state.gridCheckbox === undefined) {
        state.gridCheckbox = {};
      }
      state.gridCheckbox[data.key] = data.value as boolean;
      break;
    case UiType.CODE_BOOK:
      if (state.codebook === undefined) {
        state.codebook = {};
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.codebook[data.key] = data.value as Array<any>;
      break;
    case UiType.INPUT_FILE:
      if (state.inputFile === undefined) {
        state.inputFile = {};
      }
      switch (typeof data.value) {
        case "string":
          if (state.inputFile[data.key]) {
            state.inputFile[data.key] = {
              filename: data.value,
              vo: state.inputFile[data.key].vo,
            };
          } else {
            state.inputFile[data.key] = { filename: data.value };
          }

          break;
        default: {
          let v = data.value as FileType;
          if (state.inputFile[data.key]) {
            if (state.inputFile[data.key].resrc) {
              if (v) {
                v.resrc = state.inputFile[data.key].resrc;
                v.vo = state.inputFile[data.key].vo;
              } else {
                v = {
                  filename: "",
                  resrc: state.inputFile[data.key].resrc,
                  vo: state.inputFile[data.key].vo,
                };
              }
            }
            if (isHttp(state.inputFile[data.key].filename)) {
              if (v) {
                if (v.filename !== state.inputFile[data.key].filename) {
                  v.resrc = state.inputFile[data.key].filename;
                  v.vo = state.inputFile[data.key].vo;
                }
              } else {
                v = {
                  filename: "",
                  resrc: state.inputFile[data.key].filename,
                  vo: state.inputFile[data.key].vo,
                };
              }
            }
          }
          state.inputFile[data.key] = v;
          break;
        }
      }
      break;
    case UiType.GRID_OPTION:
      {
        if (state.gridOption === undefined) {
          state.gridOption = {};
        }
        if (state.gridOption[data.key] === undefined) {
          state.gridOption[data.key] = undefined;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const k = data.value as { id: string; value: any };
        if (state.gridOption[data.key]) {
          if (state.gridOption[data.key][k.id]) {
            switch (k.id) {
              case "gridSort":
                state.gridOption[data.key][k.id] = k.value;
                break;
              default:
                switch (typeof k.value) {
                  case "object":
                    Object.keys(k.value).forEach(ks => {
                      state.gridOption![data.key][k.id][ks] = k.value[ks];
                    });
                    break;
                  default:
                    state.gridOption[data.key][k.id] = k.value;
                    break;
                }
                break;
            }
          } else {
            state.gridOption[data.key][k.id] = k.value;
          }
        } else {
          state.gridOption[data.key] = { [k.id]: k.value };
        }
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
      if (state.inputText !== undefined) {
        delete state.inputText[action.key];
        if (Object.keys(state.inputText).length === 0) {
          delete state.inputText;
        }
      }
      break;
    case UiType.VALID:
      if (state.valid !== undefined && state.validP !== undefined) {
        delete state.valid[action.key];
        delete state.validP[action.key];
        if (Object.keys(state.valid).length === 0) {
          delete state.valid;
          delete state.validP;
        }
      }
      break;
    case UiType.SELECT_BOX:
      if (state.selectbox !== undefined) {
        delete state.selectbox[action.key];
        if (Object.keys(state.selectbox).length === 0) {
          delete state.selectbox;
        }
      }
      break;
    case UiType.CHECK_BOX:
      if (state.checkBox !== undefined) {
        if (state.checkBox[action.key] === undefined) {
          state.checkBox[action.key] = {};
        }
        delete state.checkBox[action.key][action.value as string];
        if (Object.keys(state.checkBox[action.key]).length === 0) {
          delete state.checkBox[action.key];
        }
        if (Object.keys(state.checkBox).length === 0) {
          delete state.checkBox;
        }
      }
      break;
    case UiType.CHECK_BOX_GROUP:
      if (state.checkBoxGoup !== undefined) {
        delete state.checkBoxGoup[action.key];
        if (Object.keys(state.checkBoxGoup).length === 0) {
          delete state.checkBoxGoup;
        }
      }
      break;
    case UiType.RADIO_BOX:
      if (state.radioBox !== undefined) {
        delete state.radioBox[action.key];
        if (Object.keys(state.radioBox).length === 0) {
          delete state.radioBox;
        }
      }
      break;
    case UiType.BUTTON:
      if (state.button !== undefined) {
        delete state.button[action.key];
        if (Object.keys(state.button).length === 0) {
          delete state.button;
        }
      }
      break;
    case UiType.GRID_CHECKBOX:
      if (state.gridCheckbox !== undefined) {
        delete state.gridCheckbox[action.key];
        if (Object.keys(state.gridCheckbox).length === 0) {
          delete state.gridCheckbox;
        }
      }
      break;
    case UiType.GRID_OPTION:
      if (state.gridOption !== undefined) {
        if (state.gridOption[action.key] !== undefined) {
          delete state.gridOption[action.key][action.value as string];
          if (Object.keys(state.gridOption[action.key]).length === 0) {
            delete state.gridOption[action.key];
          }
        }
        if (Object.keys(state.gridOption).length === 0) {
          delete state.gridOption;
        }
      }
      break;
    case UiType.CODE_BOOK:
      if (state.codebook !== undefined) {
        delete state.codebook[action.key];
        if (Object.keys(state.codebook).length === 0) {
          delete state.codebook;
        }
      }
      break;
    case UiType.INPUT_FILE:
      if (state.inputFile !== undefined) {
        delete state.inputFile[action.key];
        if (Object.keys(state.inputFile).length === 0) {
          delete state.inputFile;
        }
      }
      break;
    default:
      alert(`isNot type check type :: ${action.type}`);
      break;
  }
}

const uiSlice = createSlice({
  name,
  initialState: {
    // button: {},
    // checkBox: {},
    // checkBoxGoup: {},
    // codebook: {},
    // gridCheckbox: {},
    // gridOption: {},
    // inputFile: {},
    // inputText: {},
    // radioBox: {},
    // selectbox: {},
    // valid: {},
    // validP: {},
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
