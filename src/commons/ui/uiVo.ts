import { useDispatch } from "react-redux";
import { IUiAction, rdxTotalRemoveUi, rdxTotalSetUi } from "./uiR";

export enum UiCenter {
  INIT = "init",
  REMOVE = "remove",
  DEFAULT = "default",
  BACK = "backupValid",
}
const center: { [key: string]: Array<IUiAction> } = {};
const codeCenter: { [key: string]: NodeJS.Timeout } = {};
center[UiCenter.INIT] = [];
center[UiCenter.REMOVE] = [];
center[UiCenter.BACK] = [];
/**
 * ui 초기화시 한번에 호출되게 하기 위해 처리되는 로직
 * @returns
 * @deprecated 외부 사용금지
 */
export function getInit() {
  return center[UiCenter.INIT];
}

/**
 * @returns
 * @deprecated 외부 사용금지
 */
export function getRemove() {
  return center[UiCenter.REMOVE];
}

/**
 * @param key
 * @returns
 * @deprecated 외부 사용금지
 */
export function getUi(key?: string) {
  switch (key) {
    case undefined:
      return center[UiCenter.DEFAULT];
    default:
      return center[key];
  }
}

/**
 * ui 초기화시 등록된 호출이 끝났을경우 초기화를 위해 호출됨
 * @deprecated 외부 사용금지
 */
export function resetInit() {
  center[UiCenter.BACK] = center[UiCenter.BACK].concat(
    center[UiCenter.INIT].filter(
      a =>
        a.type === UiType.VALID &&
        center[UiCenter.BACK].filter(k => k.key === a.key).length === 0
    )
  );
  center[UiCenter.INIT] = [];
}
/**
 * @deprecated 외부 사용금지
 */
export function resetRemove() {
  center[UiCenter.BACK] = [];
  center[UiCenter.REMOVE] = [];
}
/**
 * @param key
 * @deprecated 외부 사용금지
 */
export function resteUi(key?: string) {
  switch (key) {
    case undefined:
      center[UiCenter.DEFAULT] = [];
      break;
    default:
      center[key] = [];
      break;
  }
}

/**
 * ui 초기화시 한번에 처리되게 등록하는 로직
 * @param value
 * @deprecated 외부 사용금지
 */
export function addInit(value: IUiAction, callBack?: () => void) {
  switch (value.type) {
    case UiType.CHECK_BOX:
    case UiType.CHECK_BOX_GROUP:
      break;
    default:
      {
        const idx = center[UiCenter.INIT].findIndex(
          a => a.type === value.type && a.key === value.key
        );
        if (idx !== -1) {
          center[UiCenter.INIT].splice(idx, 1);
        }
      }
      break;
  }
  center[UiCenter.INIT].push(value);
  if (codeCenter[UiCenter.INIT] !== undefined) {
    clearTimeout(codeCenter[UiCenter.INIT]);
  }
  codeCenter[UiCenter.INIT] = setTimeout(() => {
    if (center[UiCenter.INIT].length > 0 && callBack !== undefined) {
      callBack();
      delete codeCenter[UiCenter.INIT];
    }
  }, 100);
}

/**
 * @param value
 * @param callBack
 * @deprecated 외부 사용금지
 */
export function removeEnd(value: IUiAction, callBack?: () => void) {
  center[UiCenter.REMOVE].push(value);
  if (codeCenter[UiCenter.REMOVE] !== undefined) {
    clearTimeout(codeCenter[UiCenter.REMOVE]);
  }
  codeCenter[UiCenter.REMOVE] = setTimeout(() => {
    if (center[UiCenter.REMOVE].length > 0 && callBack !== undefined) {
      callBack();
      delete codeCenter[UiCenter.REMOVE];
    }
  }, 100);
}

/**
 * @param vo
 * @param key
 * @returns
 * @deprecated 외부 사용금지
 */
export function addUi(vo: IUiAction, key?: string) {
  switch (key) {
    case undefined:
      if (center[UiCenter.DEFAULT] === undefined) {
        center[UiCenter.DEFAULT] = [];
      }
      return center[UiCenter.DEFAULT].push(vo);
    default:
      if (center[key] === undefined) {
        center[key] = [];
      }
      return center[key].push(vo);
  }
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
  INPUT_TEXT = 1,
  INPUT_FILE = 9,
  RADIO_BOX = 2,
  SELECT_BOX = 5,
  CHECK_BOX = 6,
  CHECK_BOX_GROUP = 8,
  BUTTON = 7,
  GRID_CHECKBOX = 10,
  CODE_BOOK = 20,
  VALID = 99,
}

export interface ICheckBox {
  id: string;
  text: string;
  isAll?: boolean;
}

/**
 * ui 컴포넌트 자동 초기 통합 통신을 위한 callback
 * @returns
 * @deprecated 외부 사용금지
 */
export const privateUseInitCallback = () => {
  const dispatch = useDispatch();
  return () => {
    if (getRemove().length === 0) {
      dispatch(rdxTotalSetUi(getInit()));
      resetInit();
    }
  };
};

/**
 * ui 컴포넌트 자동 삭제 통합 통신을 위한 callback
 * @returns
 * @deprecated 외부 사용금지
 */
export const privateUseRemoveCallback = () => {
  const dispatch = useDispatch();
  const initCallback = privateUseInitCallback();
  return () => {
    dispatch(rdxTotalRemoveUi(getRemove()));
    resetRemove();
    if (getInit().length !== 0) {
      initCallback();
    }
  };
};
