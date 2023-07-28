import type { IGridPageableDo } from "./grid/GridVo";
import type { IValid } from "./useValid";

export enum UiCenter {
  INIT = "init",
  REMOVE = "remove",
  DEFAULT = "default",
  BACK = "backupValid",
}

/**
 * @param INPUT_TEXT inputText 값 저장 타입
 * @param RADIO_BOX radio 값 저장 타입
 * @param SELECT_BOX selectBox 값 저장 타입
 * @param CHECK_BOX checkBox 값 저장 타입
 * @param GRID_CHECKBOX gridCheckBox 값 저장 타입
 * @param CODE_BOOK 코드 북 저장 타입
 * @param VALID 조건 체크 저장 타입
 */
export enum UiType {
  VALID = 99,
  BUTTON = 7,
  INPUT_TEXT = 1,
  INPUT_FILE = 9,
  RADIO_BOX = 2,
  SELECT_BOX = 5,
  CHECK_BOX = 6,
  CHECK_BOX_GROUP = 8,
  CODE_BOOK = 20,
  GRID_CHECKBOX = 10,
  GRID_OPTION = 12,
}

export interface ICheckBox {
  id: string;
  text: string;
  isAll?: boolean;
}

export type IUiActionValue =
  | undefined
  | string
  | number
  | boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Array<any>
  | FileType
  // | FileType[]
  | { idx: number; value: boolean | undefined | string }
  | { sortId: string; value: boolean | undefined | string }
  | { id: string; value?: string }
  | { key: string; value: boolean | undefined | string }
  | {
      id: string;
      value?: { [key: string]: string | boolean | number | undefined };
    }
  | { id: string; value?: IGridPageableDo };
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
  inputText?: { [key: string]: string | undefined };
  radioBox?: { [key: string]: string | number | undefined };
  checkBox?: { [key: string]: { [key: string]: boolean } };
  checkBoxGoup?: { [key: string]: { isAll: boolean; value: Array<string> } };
  selectbox?: { [key: string]: number | string | undefined };
  button?: { [key: string]: boolean };
  valid?: {
    [key: string]: { display?: boolean; value?: boolean };
  };
  validP?: { [key: string]: IValid<IUiActionValue> };
  gridCheckbox?: { [key: string]: boolean };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codebook?: { [key: string]: Array<any> };
  // inputFile?: { [key: string]: FileType | FileType[] };
  inputFile?: { [key: string]: FileType };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridOption?: { [key: string]: any };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FileType<T = any> {
  filename: string;
  filetype?: string;
  imageData?: string;
  file?: File;
  /** 이미지 변경시 서버에 있던 이미지 파일 링크 */
  resrc?: string;
  vo?: T;
}
