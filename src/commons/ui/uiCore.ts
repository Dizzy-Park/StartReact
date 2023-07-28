import { useDispatch } from "react-redux";
import { UiCenter, UiType, type IUiAction } from "./uiVo";
import { rdxTotalRemoveUi, rdxTotalSetUi } from "./uiR";

/** 액션을 한군데로 모아주는 변수 */
const center: { [key: string]: Array<IUiAction> } = {};
const codeCenter: { [key: string]: NodeJS.Timeout } = {};
/** UI 컴포넌트가 화면에 생성될때 처리되는 action 모음 */
center[UiCenter.INIT] = [];
/** UI 컴포넌트가 화면에 지워질때 처리되는 action 모음 */
center[UiCenter.REMOVE] = [];
/** 비동기로 치뤄지는 동안 Valid 가 저장되어 있는 객체 */
center[UiCenter.BACK] = [];
/**
 * UI 컴포넌트가 화면에 생성될때 처리되는 action 조회
 * @returns
 * @deprecated 외부 사용금지
 */
export function getInit() {
  return center[UiCenter.INIT];
}

/**
 * UI 컴포넌트가 화면에 지워질때 처리되는 action 조회
 * @returns
 * @deprecated 외부 사용금지
 */
export function getRemove() {
  return center[UiCenter.REMOVE];
}

/**
 * UI 컴포넌트에서 change 및 namespace 처리되어 모이는 action 조회
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
 * ui 삭제후 초기화를 위해 호출
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
 * 100ms 의 시간을 가지고 한번씩 처리됨
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
  if (typeof window !== "undefined") {
    codeCenter[UiCenter.INIT] = setTimeout(() => {
      if (center[UiCenter.INIT].length > 0 && callBack !== undefined) {
        callBack();
        delete codeCenter[UiCenter.INIT];
      }
    }, 100);
  } else {
    if (center[UiCenter.INIT].length > 0 && callBack !== undefined) {
      callBack();
      delete codeCenter[UiCenter.INIT];
    }
  }
}

/**
 * ui 삭제시 한번에 처리되게 등록하는 로직
 * 100ms 의 시간을 가지고 한번씩 처리됨
 * @param value
 * @param callBack
 * @deprecated 외부 사용금지
 */
export function removeEnd(value: IUiAction, callBack?: () => void) {
  center[UiCenter.REMOVE].push(value);
  if (codeCenter[UiCenter.REMOVE] !== undefined) {
    clearTimeout(codeCenter[UiCenter.REMOVE]);
  }
  if (typeof window !== "undefined") {
    codeCenter[UiCenter.REMOVE] = setTimeout(() => {
      if (center[UiCenter.REMOVE].length > 0 && callBack !== undefined) {
        callBack();
        delete codeCenter[UiCenter.REMOVE];
      }
    }, 100);
  } else {
    if (center[UiCenter.REMOVE].length > 0 && callBack !== undefined) {
      callBack();
      delete codeCenter[UiCenter.REMOVE];
    }
  }
}

/**
 * redux 에 값을 등록및 수정하기위한 action 추가를 하는 함수
 * @param vo
 * @param key
 * @returns  추가된 배열 값
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
 * redux 에 값을 삭제 하기 위한 action 추가를 하는 함수
 * @param vo
 * @param key
 * @returns  추가된 배열 값
 * @deprecated 외부 사용금지
 */
export function removeUi(vo: IUiAction, key?: string) {
  switch (key) {
    case undefined:
      if (center[UiCenter.REMOVE] === undefined) {
        center[UiCenter.REMOVE] = [];
      }
      return center[UiCenter.REMOVE].push(vo);
    default:
      if (center[key] === undefined) {
        center[key] = [];
      }
      return center[key].push(vo);
  }
}

/**
 * ui 컴포넌트 자동 초기 통합 통신을 위한 callback
 * Hook 내부에서 사용 가능
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
 * Hook 내부에서 사용 가능
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
