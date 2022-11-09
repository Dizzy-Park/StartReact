import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSelectorEq } from "../store/common";
import { IUiAction, rdxSetUi, rdxTotalSetUi, IUiActionValue } from "./uiR";
import {
  addInit,
  privateUseInitCallback,
  privateUseRemoveCallback,
  removeEnd,
  UiType,
} from "./uiVo";
import React, { useEffect } from "react";
import { useAbsAlert } from "../popup/store/absPopupHook";
import { ICommonsStore } from "..";

/**
 * @param EMAIL email
 * @param PASSWORD password
 * @param NUMBER number
 * @param TEL tel
 * @param SELECT select
 * @param BOOLEAN boolean
 */
export enum ValidType {
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  TEL = "tel",
  SELECT = "select",
  TEXT = "text",
  BOOLEAN = "boolean",
}

/**
 * ValidType: EMAIL, PASSWORD, NUMBER, TEL, SELECT, TEXT, BOOLEAN
 *
 * HTMLInputElement 타입 사용
 * @param type {@link ValidType} type
 * @param required 필수 값인지
 * @param min 숫자일경우 최소 값
 * @param max 숫자일경우 최대 값
 * @param minLength 최소 글자수
 * @param maxLength 최대 글자수
 * @param emoji 이모티콘 적용 여부
 * @param useValid 추가적으로 실행될 조건 함수
 */
export interface IValid<T> {
  type?: ValidType;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  emoji?: boolean;
  message?: string;
  useValid?: (value?: T) => boolean;
}

/**
 * 조건 체크를 위한 id 값 (통합으로 변경)
 * @param id
 * @param setValue change 연결
 * @param valid {@link IValid}
 * @param init 초기값 설정
 * @returns
 */
export const useValid = <T>(
  id: string,
  valid?: IValid<T>,
  setValue?: (value: T) => void,
  init?: T
) => {
  const { validValue } = useSelectorEq((state: ICommonsStore) => ({
    validValue: state.ui.valid[id],
  }));
  const initCallback = privateUseInitCallback();
  const removeCallback = privateUseRemoveCallback();
  const change = changeValid();
  if (valid !== undefined) {
    useEffect(() => {
      const action = change(id, valid, init);
      addInit(
        {
          ...action,
          valid: valid as IValid<IUiActionValue>,
        },
        initCallback
      );
      return () => {
        removeEnd({ type: UiType.VALID, key: id }, removeCallback);
      };
    }, []);
  }
  const { changeValue } = useValidChange<T>(id, setValue);
  return { validValue: validValue ? validValue.display : true, changeValue };
};

/**
 * 훅이 아닌 함수형
 * IUiAction 을 반환해주는 형태의 valid 체크 함수
 * @returns
 */
export const changeValid = () => {
  const valid = <T>(id: string, valid: IValid<T>, value?: T) => {
    let bo;
    if (valid && valid.type === ValidType.BOOLEAN) {
      bo = Boolean(value);
    } else if (valid) {
      bo = validInput(valid, value);
    } else {
      bo = true;
    }
    // display boolean 체크
    let dbo;
    switch (typeof value) {
      case "string":
        dbo = value.length > 0 ? bo : true;
        break;
      case "boolean":
        dbo = bo;
        break;
      default:
        dbo = false;
        break;
    }
    return {
      type: UiType.VALID,
      key: id,
      display: dbo,
      value: bo === undefined ? false : bo,
    } as IUiAction;
  };
  return valid;
};

/**
 * 기존 Validation 에 값만 바뀌었을 경우 처리되는 로직
 * @param id
 * @param setValue
 * @returns
 */
export const useValidChange = <T>(
  id: string,
  setValue?: (value: T, keyName?: string) => void
) => {
  const { valid } = useSelectorEq((state: ICommonsStore) => ({
    valid: state.ui.validP[id],
  }));
  const dispatch = useDispatch();
  const change = changeValid();
  const changeValue = (value: T, keyName?: string) => {
    if (valid !== undefined) {
      // console.log(dbo, bo);
      const action = change(id, valid, value as IUiActionValue);
      dispatch(rdxSetUi(action));
    }
    if (setValue) {
      setValue(value, keyName);
    }
  };
  return { changeValue };
};

/**
 * Validation 값만 필요할 경우
 * @param id
 * @returns
 */
export const useValidValue = (id: string) => {
  const { validValue } = useSelectorEq((state: ICommonsStore) => ({
    validValue: state.ui.valid[id],
  }));
  return { validValue: validValue ? validValue.display : true };
};

/**
 * Validation 통과여부 value가 필요한 경우
 * @param id
 * @returns
 */
export const useValidResult = (id: string) => {
  const { validValue } = useSelectorEq((state: ICommonsStore) => ({
    validValue: state.ui.valid[id],
  }));
  return { validValue: validValue ? validValue.value : false };
};

/**
 * 등록된 전체 Validation 체크
 * true => 빈값 있음 혹은 값이 잘못되었음
 * false => 성공
 * @returns
 */
export const useTotalValid = (
  buttonComponent?: React.FC,
  width?: number | string
) => {
  const { valid, validP } = useSelector((state: ICommonsStore) => state.ui);
  const { alert } = useAbsAlert(buttonComponent, width);
  const isTotalDisabled = () => {
    const keys = Object.keys(valid);
    keys.sort();
    const fkey = keys.find(key => valid[key].value === false);
    const bo = fkey !== undefined;
    if (fkey) {
      const message = validP[fkey]?.message;
      if (message) {
        alert(message);
        return true;
      } else {
        // 메시지 입력 안했을시 통합으로 표현하기 위해 넣어둠
        // alert("모든 항목을 입력하셔야 합니다.");
      }
    }
    return bo;
  };
  return { valid, isTotalDisabled };
};

/**
 * thunk 로직에서 값 세팅과 Validation 체크를 위한 함수
 * Value 초기값 설정
 * @param uiValue - { key: string; type: UiType; value: T }[]
 * @param thunkApi
 * @deprecated 삭제 예정 uiAction 으로 대체
 */
export function initValidation(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uiValue: { key: string; type: UiType; value: any }[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thunkApi: any
) {
  const vArr: IUiAction[] = [];
  const temp = uiValue.map(item => {
    const v = thunkApi.getState().ui.validP[item.key];
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
      value: item.value,
    };
  });
  thunkApi.dispatch(rdxTotalSetUi(vArr.concat(temp)));
}

const checkNumRange = (value: string, min?: number, max?: number) => {
  if (min && max) {
    return max >= Number(value) && Number(value) >= min;
  } else if (min || min === 0) {
    return Number(value) >= min;
  } else if (max || max === 0) {
    return max >= Number(value);
  } else {
    return true;
  }
};

const checkLength = (value: string, min?: number, max?: number) => {
  if (value !== undefined) {
    if (min && max) {
      return max >= value.length && value.length >= min;
    } else if (min) {
      return value.length >= min;
    } else if (max) {
      return max >= value.length;
    } else {
      return true;
    }
  }
};

const checkRequired = <T>(value?: T, required?: boolean) => {
  if (required !== undefined && required) {
    if (
      value === undefined ||
      (typeof value === "string" && value.length === 0)
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

const checkEmoji = (value: string, emoji?: boolean) => {
  const disEmojiRule =
    /^[!@#$&%~₩^*()\-_=+|[\]{};:\\'`",.<>\\/?0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\x20]*$/;
  if (emoji !== undefined && emoji === false) {
    return disEmojiRule.test(value);
  } else {
    return true;
  }
};

const checkEmail = (value: string) => {
  const emailRule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식
  return emailRule.test(value);
};

const checkPass = (value: string) => {
  const passwordRule =
    /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //비밀번호: 8~32자리,영문,특수문자
  return passwordRule.test(value);
};

const checkPhone = (value: string) => {
  const telePhoneRule =
    /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/; //유선전화
  const mobilePhoneRule =
    /^0([1|7])([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; //휴대전화
  const companyPhoneRule = value.length >= 7; // NOTE: 기업번호 임시 벨리데이션 추가 필요;
  return (
    telePhoneRule.test(value) || mobilePhoneRule.test(value) || companyPhoneRule
  );
};

const checkNumber = (value: string) => {
  const numberRule = /[0-9]/;
  return numberRule.test(value);
};

const checkUse = <T>(value?: T, fu?: (value?: T) => boolean) => {
  // eslint-disable-next-line no-async-promise-executor
  if (fu) {
    return fu(value);
  }
  return true;
};

export const validInput = <T>(valid: IValid<T>, value?: T) => {
  const check: Array<boolean | undefined> = [];
  check.push(checkRequired(value, valid.required));
  switch (valid.type) {
    case ValidType.EMAIL:
      check.push(checkEmail(String(value)));
      break;
    case ValidType.PASSWORD:
      check.push(checkPass(String(value)));
      break;
    case ValidType.NUMBER:
      check.push(checkNumRange(String(value), valid.min, valid.max));
      check.push(checkNumber(String(value)));
      break;
    case ValidType.TEL:
      if (
        (valid.required === false && String(value ? value : "").length > 0) ||
        valid.required === true
      ) {
        check.push(checkPhone(String(value)));
      }
      break;
    case ValidType.SELECT:
      break;
    case ValidType.TEXT:
    default:
      check.push(checkLength(String(value), valid.minLength, valid.maxLength));
      check.push(checkEmoji(String(value), valid.emoji));
      break;
  }
  if (valid.useValid) {
    check.push(checkUse(value, valid.useValid));
  }
  return check.findIndex(b => b === false) === -1;
};
