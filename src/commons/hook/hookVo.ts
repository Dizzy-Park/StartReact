import type {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  RefObject,
} from "react";

/**
 * Input, TextArea 에 공통으로 쓰이틑 옵션값들
 */
export interface IUseCommon {
  /** 고유값 */
  id?: string;
  /** 텍스트 값 */
  value?: string;
  /** 가이드 텍스트 */
  placeholder?: string;
  /** 인풋 타입 */
  type?: InputType;
}

/** useInput 훅에서 받아 들이는 옵션 */
export interface IUseParam<T extends HTMLElement> {
  id?: string;
  key?: number;
  initalValue?: string;
  initalChecked?: boolean;
  placeholder?: string;
  type?: InputType;
  target?: RefObject<T>;
  onChangeHandler?: IUseEventHandler;
  onNextHandler?: IUseEventHandler;
  onFocusOut?: IUseEventHandler;
}

interface IUseInputCommon extends IUseCommon {
  /** 변경 되었을때 */
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** 키가 눌렸을때 */
  onKeyPress?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** 포커스 잃었을때 */
  onBlur?: FocusEventHandler<HTMLElement>;
  /** 내부 값 직접 변경 함수 */
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * input 에 입력된 값 과 onChange 그리고 onKeyPress 가 설정되어있음
 * enter 키 입력시 이동시키기 위한 처리가 되어있음
 * 훅에서 반환해주는 객체
 */
export interface IUseInput extends IUseInputCommon {
  /** 체크박스 값 */
  checked?: boolean;
  /** 체크박스가 체크 되었을때 */
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

/** 인풋 타입 정의 */
export type InputType =
  | "text"
  | "number"
  | "search"
  | "email"
  | "tel"
  | "password"
  | "checkbox"
  | "file";

/**
 * 이벤트 발생시 타입 정의
 */
export type InputEventType = "change" | "next" | "focusOut";

/**
 * 이벤트 발생시 전달하는 객체
 */
export interface IUseInputEventParam {
  id?: string;
  key?: number;
  value?: string;
  type: InputEventType;
  checked?: boolean;
  file?: Blob;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

/** 이벤트 핸들러 정의 */
export type IUseEventHandler = (
  value: IUseInputEventParam
) => Promise<void> | void;

/**
 * input 에 입력된 값 과 onChange 그리고 onKeyPress 가 설정되어있음
 * enter 키 입력시 이동시키기 위한 처리가 되어있음
 * input 객체를 ref 로 넘겨준다
 * 훅에서 반환해주는 객체
 */
export interface IUseInputRef<T extends HTMLElement> extends IUseInput {
  inputRef?: RefObject<T>;
}

/**
 * useInput 훅에서 받아 들이는 옵션
 * ref 를 추가로 받는다
 */
export interface IUserParamRef<T extends HTMLElement, Z extends HTMLElement>
  extends IUseParam<T> {
  inputRef?: RefObject<Z>;
}

/**
 * TextArea 에 입력된 값 과 onChange 그리고 onKeyPress 가 설정되어있음
 * enter 키 입력시 이동시키기 위한 처리가 되어있음
 * value
 */
export interface IUseTextArea extends IUseInputCommon {}

export interface IUseTextAreaRef<T extends HTMLElement> extends IUseTextArea {
  TextAreaRef?: RefObject<T>;
}

export interface IUserParamRef<T extends HTMLElement, Z extends HTMLElement>
  extends IUseParam<T> {
  TextAreaRef?: RefObject<Z>;
}
