import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { ICommonsStore } from "..";
import { useSelectorEq } from "../store/common";
import { rdxSetUi, rdxTotalSetUi, rdxTotalRemoveUi } from "./uiR";
import {
  type IValid,
  changeValid,
  useValidChange,
  useValid,
  validInput,
} from "./useValid";
import {
  UiCenter,
  type IUiActionValue,
  UiType,
  type IUiAction,
  type ICheckBox,
  type FileType,
} from "./uiVo";
import {
  addInit,
  addUi,
  getInit,
  getRemove,
  getUi,
  privateUseInitCallback,
  privateUseRemoveCallback,
  removeEnd,
  removeUi,
  resteUi,
} from "./uiCore";

/**
 * ui 컴포넌트에 값을 일률 적으로 전달하기 위한 hook
 * add 는 추가 (자동 valid 추가 처리 되었음)
 * commit 는 전송
 * @param namespace 고유값 없을경우 default 로 저장
 * @returns
 */
export const useUiAction = (namespace?: string) => {
  const dispatch = useDispatch();
  const { validP } = useSelectorEq((state: ICommonsStore) => ({
    validP: state.ui.validP,
  }));
  const add = <T>(type: UiType, key: string | T, value: IUiActionValue) => {
    privateAddUi(namespace, type, key, value);
    privateAddValid(namespace, key as string, value, validP);
  };
  const remove = <T>(type: UiType, key: string | T, value: IUiActionValue) => {
    privateRemoveUi(namespace, type, key, value);
    privateRemoveValid(namespace, key as string);
  };
  const commit = (remove?: boolean) => {
    if (remove) {
      const uiArr = getRemove();
      if (uiArr && uiArr.length > 0) {
        dispatch(rdxTotalRemoveUi(uiArr));
        resteUi(UiCenter.REMOVE);
      }
    } else {
      const uiArr = getUi(namespace);
      if (uiArr && uiArr.length > 0) {
        dispatch(rdxTotalSetUi(uiArr));
        resteUi(namespace);
      }
    }
  };
  return { add, commit, remove };
};

/**
 * ui 컴포넌트에 값을 일률 적으로 전달하기 위한 함수
 * reduxThunk 에서 사용하기위한 처리
 * add 는 추가 (자동 valid 추가 처리 되었음)
 * commit 는 전송
 * @param namespace 고유값 없을경우 default 로 저장
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uiAction = (thunkApi: any, namespace?: string) => {
  const validP = thunkApi.getState().ui.validP as {
    [key: string]: IValid<IUiActionValue>;
  };
  const add = <T>(type: UiType, key: string | T, value: IUiActionValue) => {
    privateAddUi(namespace, type, key, value);
    privateAddValid(namespace, key as string, value, validP);
  };
  const remove = <T>(type: UiType, key: string | T, value: IUiActionValue) => {
    privateRemoveUi(namespace, type, key, value);
    privateRemoveValid(namespace, key as string);
  };
  const commit = () => {
    const uiArr = getUi(namespace);
    if (uiArr && uiArr.length > 0) {
      thunkApi.dispatch(rdxTotalSetUi(uiArr));
      resteUi(namespace);
    }
  };
  return { add, commit, remove };
};

/**
 * @deprecated 외부 사용금지
 */
const privateAddUi = <T>(
  namespace: string | undefined,
  type: UiType,
  key: string | T,
  value: IUiActionValue
) => {
  const _namespace = getInit().length === 0 ? namespace : UiCenter.INIT;
  addUi(
    {
      type: type,
      key: key as string,
      value: value,
    },
    _namespace
  );
};

/**
 * @deprecated 외부 사용금지
 */
const privateRemoveUi = <T>(
  namespace: string | undefined,
  type: UiType,
  key: string | T,
  value: IUiActionValue
) => {
  removeUi(
    {
      type: type,
      key: key as string,
      value: value,
    },
    namespace
  );
};

/**
 * @deprecated 외부 사용금지
 */
const privateAddValid = (
  namespace: string | undefined,
  key: string,
  value: IUiActionValue,
  validP?: {
    [key: string]: IValid<IUiActionValue>;
  }
) => {
  const valid = changeValid();
  const _namespace = getInit().length === 0 ? namespace : UiCenter.INIT;
  const backVp = getUi(UiCenter.BACK).filter(k => k.key === key);
  let vp: IValid<IUiActionValue> | undefined = validP
    ? validP[key as string]
    : undefined;
  if (vp === undefined) {
    if (backVp.length !== 0) {
      vp = backVp[0].valid;
    } else if (getInit().length !== 0) {
      vp = getInitValid(key as string);
    }
  }
  if (vp) {
    const v = valid(key as string, vp, value);
    if (v) {
      addUi(v, _namespace);
    }
  }
};

/**
 * @deprecated 외부 사용금지
 */
const privateRemoveValid = (namespace: string | undefined, key: string) => {
  removeUi({ type: UiType.VALID, key: key } as IUiAction, namespace);
};

/**
 * @deprecated 외부 사용금지
 */
const getInitValid = (key: string) => {
  const init = getInit();
  const vp = init.filter(i => i.type === UiType.VALID && i.key === key);
  if (vp.length > 0) {
    return vp[0].valid;
  }
  return undefined;
};

/**
 *
 * @returns
 * @deprecated 삭제 예정 uiAction 으로 대체
 */
export const useReset = () => {
  const { uiValid } = useSelectorEq((state: ICommonsStore) => ({
    uiValid: state.ui.validP,
  }));
  const dispatch = useDispatch();
  const resetTotal = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uiValue: { key: string; type: UiType; value: any; isAll?: boolean }[]
  ) => {
    const vArr: IUiAction[] = [];
    const temp = uiValue.map(item => {
      const v = uiValid ? uiValid[item.key] : undefined;
      if (v) {
        const bo = validInput(v, item.value);
        vArr.push({
          key: item.key,
          type: UiType.VALID,
          display: bo,
          value: bo,
        });
      }
      return {
        key: item.key,
        type: item.type,
        isAll: item.isAll,
        value: item.value,
      };
    });
    dispatch(rdxTotalSetUi(vArr.concat(temp)));
  };
  return { resetTotal };
};

/**
 * @deprecated 외부 사용금지
 */
const useInitEffect = (
  initDo: IUiAction,
  removeDo?: IUiAction,
  isRemove?: boolean
) => {
  const initCallback = privateUseInitCallback();
  const removeCallback = privateUseRemoveCallback();
  useEffect(() => {
    addInit(initDo, initCallback);
    if (isRemove === true || isRemove === undefined) {
      return () => {
        removeEnd(removeDo ? removeDo : initDo, removeCallback);
      };
    }
  }, []);
};

/**
 * UiInputText 에서 사용되어 지고 있으며
 * InputText 와 연결시켜 사용할수 있게 되어 있다
 * @param id
 * @param valid
 * @param callBack
 * @returns
 */
export const useInputText = (
  id: string,
  valid?: IValid<string>,
  init?: string,
  callBack?: (value?: string) => void
) => {
  const { inputTextValue } = useInputValue(id);
  const { add, commit } = useUiAction();
  const initValue = init ? init : inputTextValue ? inputTextValue : "";
  useInitEffect({
    type: UiType.INPUT_TEXT,
    key: id,
    value: initValue,
  });
  const { changeValue } = useValid(
    id,
    valid,
    (value?: string) => {
      add(
        UiType.INPUT_TEXT,
        id,
        typeof value === "string" ? value.trim() : value
      );
      commit();
      if (callBack) {
        callBack(typeof value === "string" ? value.trim() : value);
      }
    },
    typeof initValue === "string" ? initValue.trim() : initValue
  );
  return { inputTextValue, changeValue };
};

/**
 * ui 컴포넌트에서 값 참조를 위한 hook
 * @param id
 * @returns
 */
export const useInputValue = <T>(id: string | T) => {
  const { inputTextValue } = useSelectorEq((state: ICommonsStore) => ({
    inputTextValue: state.ui.inputText
      ? state.ui.inputText[id as string]
      : undefined,
  }));
  return { inputTextValue };
};

/**
 * 특정 로직에서 value 의 값을 바꾸고 싶을 때 예외 처리
 * InputText or UiInputText 에 연결시켜 외부에서 값을 변동하는 부분이 있을경우 사용
 * @param id
 * @returns
 */
export const useSetInput = <T>(id: string | T) => {
  const dispatch = useDispatch();
  const initCallback = privateUseInitCallback();
  const { changeValue } = useValidChange(id as string, (value?: string) => {
    const actionDo = {
      type: UiType.INPUT_TEXT,
      key: id as string,
      value: value,
    };
    if (getInit().length !== 0) {
      addInit(actionDo, initCallback);
    } else {
      dispatch(rdxSetUi(actionDo));
    }
  });
  return { changeValue };
};

/**
 * UiSelectBox 에서 사용되어 지고 있으며
 * SelectBox 와 연결시켜 사용할수 있게 되어 있다
 * @param id
 * @param valid
 * @returns
 */
export const useSelectBox = (
  id: string,
  valid?: IValid<string | number | undefined>,
  init?: string | number,
  callBack?: (value?: string | number, keyName?: string) => void
) => {
  const { selectValue } = useSelectorEq((state: ICommonsStore) => ({
    selectValue: state.ui.selectbox ? state.ui.selectbox[id] : undefined,
  }));
  const { add, commit } = useUiAction();
  const initValue =
    init !== undefined
      ? init
      : selectValue !== undefined
      ? selectValue
      : undefined;
  useInitEffect({
    type: UiType.SELECT_BOX,
    key: id,
    value: initValue,
  });
  const { changeValue } = useValid(
    id,
    valid,
    (value?: string | number, keyName?: string) => {
      add(UiType.SELECT_BOX, id, value);
      commit();
      if (callBack) {
        callBack(value, keyName);
      }
    },
    initValue
  );
  return { selectValue, changeValue };
};

/**
 * 예외적으로 값을 바꿨을 때 Valid 값이 명확하게 정의되는 경우 사용
 * SelectBox or UiSelectBox 에 연결시켜 외부에서 값을 변동하는 부분이 있을경우 사용
 * @param id
 */
export const useSetSelectBox = (id: string) => {
  const dispatch = useDispatch();
  const { changeValue } = useValidChange(id, (value?: string | number) => {
    dispatch(rdxSetUi({ type: UiType.SELECT_BOX, key: id, value: value }));
  });
  return { changeValue };
};

export const useSelectBoxValue = <T>(id: string | T) => {
  const { selectValue } = useSelectorEq((state: ICommonsStore) => ({
    selectValue: state.ui.selectbox
      ? state.ui.selectbox[id as string]
      : undefined,
  }));
  return { selectValue };
};

export const useCheckBox = (
  id: string, //name
  key: string, // id
  valid?: IValid<boolean | undefined>, //value
  init?: boolean,
  change?: (value?: boolean) => void
) => {
  const { checkValue, validP } = useSelectorEq((state: ICommonsStore) => ({
    checkValue: state.ui.checkBox ? state.ui.checkBox[id] : undefined,
    validP: state.ui.validP,
  }));
  const dispatch = useDispatch();
  const changeValidAction = changeValid();
  useInitEffect(
    {
      type: UiType.CHECK_BOX,
      key: id,
      value: { key: key, value: init !== undefined ? init : false },
    },
    { type: UiType.CHECK_BOX, key: id, value: key }
  );
  const checkBoxValid = useValid(id + "_" + key, valid, (data?: boolean) => {
    if (checkValue) {
      const action: IUiAction[] = [];
      if (key !== "isAll") {
        const keyAr = Object.keys(checkValue).filter(
          ikey => ikey !== "isAll" && ikey !== key
        );
        const cFalse = keyAr.filter(ikey => !checkValue[ikey]);
        action.push({
          type: UiType.CHECK_BOX,
          key: id,
          value: { key: key, value: data! },
        });
        if (
          cFalse.length === 0 &&
          Object.keys(checkValue).indexOf("isAll") !== -1
        ) {
          action.push({
            type: UiType.CHECK_BOX,
            key: id,
            value: { key: "isAll", value: data! },
          });
        }
      } else {
        Object.keys(checkValue).forEach(ikey => {
          action.push({
            type: UiType.CHECK_BOX,
            key: id,
            value: { key: ikey, value: data! },
          });
          if (ikey !== "isAll") {
            const vkey = id + "_" + ikey;
            if (validP !== undefined && validP[vkey]) {
              action.push(changeValidAction(vkey, validP[vkey], data!));
            }
          }
        });
      }
      dispatch(rdxTotalSetUi(action));
    }
  });
  const changeValue = (value?: boolean) => {
    checkBoxValid.changeValue(value);
    if (change) {
      change(value);
    }
  };
  return { checkValue: checkValue ? checkValue[key] : false, changeValue };
};

export const useSetCheckbox = (id: string, key: string) => {
  const dispatch = useDispatch();
  const { changeValue } = useValidChange(id + "_" + key, (value?: boolean) => {
    dispatch(
      rdxSetUi({
        type: UiType.CHECK_BOX,
        key: id,
        value: { key: key, value: value! },
      })
    );
  });

  return { changeValue };
};

export const useCheckboxObjValue = (id: string) => {
  const { checkboxObjValue } = useSelectorEq((state: ICommonsStore) => ({
    checkboxObjValue:
      state.ui.checkBox !== undefined && state.ui.checkBox[id]
        ? state.ui.checkBox[id]
        : null,
  }));

  return { checkboxObjValue };
};

export const useCheckboxGroupValue = (id: string) => {
  const { checkboxGroupValue } = useSelectorEq((state: ICommonsStore) => ({
    checkboxGroupValue:
      state.ui.checkBoxGoup !== undefined && state.ui.checkBoxGoup[id]
        ? state.ui.checkBoxGoup[id]
        : null,
  }));

  return { checkboxGroupValue };
};

export const useCheckboxValue = (id: string, key: string) => {
  const { checkboxValue } = useSelectorEq((state: ICommonsStore) => ({
    checkboxValue:
      state.ui.checkBox !== undefined && state.ui.checkBox[id]
        ? state.ui.checkBox[id][key]
        : false,
  }));

  return { checkboxValue };
};

/**
 *
 * @param id
 * @param valid
 * @param list
 * @returns
 */
export const useCheckBoxGroup = (
  id: string,
  valid?: IValid<{ isAll: boolean; value?: Array<string> }>,
  list?: ICheckBox[],
  init?: string[]
) => {
  const { checkValue } = useSelectorEq((state: ICommonsStore) => ({
    checkValue:
      state.ui.checkBoxGoup !== undefined
        ? state.ui.checkBoxGoup[id]
        : undefined,
  }));
  const dispatch = useDispatch();
  useInitEffect(
    {
      type: UiType.CHECK_BOX_GROUP,
      key: id,
      isAll: true,
      value:
        init !== undefined
          ? init
          : checkValue?.value
          ? checkValue.value
          : list?.filter(i => !i.isAll).map(i => i.id),
    },
    { type: UiType.CHECK_BOX_GROUP, key: id }
  );
  const checkBoxValid = useValid(
    id,
    valid,
    (data: { isAll: boolean; value?: Array<string> }) => {
      dispatch(
        rdxSetUi({
          type: UiType.CHECK_BOX_GROUP,
          key: id,
          isAll: data.isAll,
          value: data.value,
        })
      );
    }
  );
  const changeValue = (isAll: boolean, value?: string[]) => {
    if (isAll) {
      checkBoxValid.changeValue({
        isAll: isAll,
        value: list!.filter(i => !i.isAll).map(i => i.id),
      });
    } else {
      checkBoxValid.changeValue({ isAll, value });
    }
  };
  return { checkValue: checkValue ? checkValue.value : [], changeValue };
};

export const useSetCheckBoxGroup = (id: string, list?: ICheckBox[]) => {
  const dispatch = useDispatch();

  const checkBoxValid = useValidChange(
    id,
    (data: { isAll: boolean; value?: Array<string> }) => {
      dispatch(
        rdxSetUi({
          type: UiType.CHECK_BOX_GROUP,
          key: id,
          isAll: data.isAll,
          value: data.value,
        })
      );
    }
  );
  const changeValue = (isAll: boolean, value?: string[]) => {
    if (isAll) {
      checkBoxValid.changeValue({
        isAll: isAll,
        value: list!.filter(i => !i.isAll).map(i => i.id),
      });
    } else {
      checkBoxValid.changeValue({ isAll, value });
    }
  };
  return { changeValue };
};

export const useRadio = (
  id: string,
  valid?: IValid<string | number | undefined>,
  init?: string | number | boolean,
  callBack?: (value?: string | number) => void
) => {
  const { checkValue } = useSelectorEq((state: ICommonsStore) => ({
    checkValue:
      state.ui.radioBox !== undefined ? state.ui.radioBox[id] : undefined,
  }));
  const dispatch = useDispatch();
  useInitEffect({
    type: UiType.RADIO_BOX,
    key: id,
    value: init,
  });
  const { changeValue } = useValid(id, valid, (value?: string | number) => {
    dispatch(rdxSetUi({ type: UiType.RADIO_BOX, key: id, value: value }));
    if (callBack) {
      callBack(value);
    }
  });
  return { checkValue, changeValue };
};

export const useRadioValue = (id: string) => {
  const { checkValue } = useSelectorEq((state: ICommonsStore) => ({
    checkValue: state.ui.radioBox ? state.ui.radioBox[id] : undefined,
  }));
  return { checkValue };
};

export const useSetRadio = (id: string) => {
  const dispatch = useDispatch();
  const { changeValue } = useValidChange(id, (value?: string | number) => {
    dispatch(rdxSetUi({ type: UiType.RADIO_BOX, key: id, value: value }));
  });
  return { changeValue };
};

// export const useCodebook = (id: string, init?: Array<any>) => {
//   const { codebookData } = useSelectorEq((state: State) => ({
//     codebookData: state.ui.codebook[id],
//   }));
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(rdxSetUi({ type: UiType.CODE_BOOK, key: id, value: init }));
//     return () => {
//       dispatch(rdxRemoveUi({ type: UiType.CODE_BOOK, key: id }));
//     };
//   }, []);
//   return { codebookData };
// };

export const useButton = (
  id: string,
  valid?: IValid<boolean>,
  init?: boolean,
  callBack?: (value?: boolean) => void
) => {
  const { buttonValue } = useButtonValue(id);
  const dispatch = useDispatch();
  useInitEffect({
    type: UiType.BUTTON,
    key: id,
    value: init,
  });
  const { changeValue } = useValid(id, valid, (value?: boolean) => {
    dispatch(rdxSetUi({ type: UiType.BUTTON, key: id, value: value }));
    if (callBack) {
      callBack(value);
    }
  });
  return { buttonValue, changeValue };
};

export const useButtonValue = (id: string) => {
  const { buttonValue } = useSelectorEq((state: ICommonsStore) => ({
    buttonValue: state.ui.button ? state.ui.button[id] : undefined,
  }));
  return { buttonValue };
};

export const useSetButton = (id: string) => {
  const dispatch = useDispatch();
  const { changeValue } = useValidChange(id, (value?: boolean) => {
    dispatch(rdxSetUi({ type: UiType.BUTTON, key: id, value: value }));
  });
  return { changeValue };
};

/** InputFile 리덕스 자동 저장 처리 */
export const useInputFile = (
  id: string,
  valid?: IValid<FileType | FileType[]>,
  init?: string
) => {
  const { inputFileValue } = useInputFileValue(id);
  const dispatch = useDispatch();
  const initValue = init
    ? { filename: init }
    : inputFileValue
    ? inputFileValue
    : { filename: "" };
  useInitEffect({
    type: UiType.INPUT_FILE,
    key: id,
    value: initValue,
  });
  const { changeValue } = useValid(
    id,
    valid,
    (value?: FileType | FileType[]) => {
      dispatch(rdxSetUi({ type: UiType.INPUT_FILE, key: id, value: value }));
    },
    initValue
  );
  return { inputFileValue, changeValue };
};

/** 리덕스 정보 접근 */
export const useInputFileValue = (id: string) => {
  const { inputFileValue } = useSelectorEq((state: ICommonsStore) => ({
    inputFileValue:
      state.ui.inputFile !== undefined && state.ui.inputFile[id as string]
        ? state.ui.inputFile[id as string]
        : { filename: "" },
  }));
  return { inputFileValue };
};

/** 미리보기 이미지 경로 필요할때 사용 */
export const useInputFilePrevImage = (id: string) => {
  const { src } = useSelectorEq((state: ICommonsStore) => ({
    src:
      state.ui.inputFile !== undefined &&
      state.ui.inputFile[id as string] &&
      !(state.ui.inputFile[id as string] instanceof Array)
        ? (state.ui.inputFile[id as string] as FileType).imageData
          ? (state.ui.inputFile[id as string] as FileType).imageData
          : (state.ui.inputFile[id as string] as FileType).filename
        : "",
  }));
  return src;
};

export const useInputFileReImage = (id: string) => {
  const { src } = useSelectorEq((state: ICommonsStore) => ({
    src:
      state.ui.inputFile !== undefined &&
      state.ui.inputFile[id as string] &&
      !(state.ui.inputFile[id as string] instanceof Array) &&
      (state.ui.inputFile[id as string] as FileType).resrc
        ? (state.ui.inputFile[id as string] as FileType).resrc
        : "",
  }));
  return src;
};

export const useInputFilePrevFile = (id: string) => {
  const { src } = useSelectorEq((state: ICommonsStore) => ({
    src:
      state.ui.inputFile !== undefined &&
      state.ui.inputFile[id as string] &&
      !(state.ui.inputFile[id as string] instanceof Array) &&
      (state.ui.inputFile[id as string] as FileType).file
        ? (state.ui.inputFile[id as string] as FileType).file
        : undefined,
  }));
  return src;
};

/**
 * 코드북에서 사용하기위한 용도와
 * 리스트 정보를 저장하기 위한 용도로 제작
 * @param id
 * @param isRemove
 * @param init
 * @returns
 */
export const useCodeBook = <T>(
  id: string,
  isRemove?: boolean,
  init?: Array<T>
) => {
  const { codebookValue } = useCodeBookValue<T>(id);
  const { add, commit } = useUiAction();
  useInitEffect(
    {
      type: UiType.CODE_BOOK,
      key: id,
      value: init ? init : codebookValue,
    },
    {
      type: UiType.CODE_BOOK,
      key: id,
    },
    isRemove
  );
  const { changeValue } = useValid(
    id,
    undefined,
    (value?: Array<T>) => {
      add(UiType.CODE_BOOK, id, value);
      commit();
    },
    init ? init : codebookValue
  );
  return {
    codebookValue,
    changeValue,
  };
};

export const useCodeBookValue = <T>(id: string) => {
  const { codebookValue } = useSelectorEq((state: ICommonsStore) => ({
    codebookValue:
      state.ui.codebook !== undefined
        ? state.ui.codebook[id as string]
        : undefined,
  }));
  return { codebookValue: codebookValue as Array<T> | undefined };
};
