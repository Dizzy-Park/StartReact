import React from "react";
import type { AbsPopupType } from "../AbsPopupType";

export interface IPopupState<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends IButton = any,
  U extends PopupCallBackParam = ButtonState
> {
  isPopup: boolean;
  popup: { [key: string]: IPopupDo<T, K, U> };
  popupAr: Array<IPopupDo<T, K, U>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returnData: { [key: string]: { [key: string]: any } };
}

/**
 * 버튼 상태
 */
export enum ButtonState {
  /** 커스텀 */
  USE = 2,
  /** 확인 */
  OK = 1,
  /** 취소 */
  NO = 0,
}

export interface IButton {
  text: string;
  state?: ButtonState;
}

export interface IPopupButtn<T extends IButton> {
  component: React.FC<T>;
  style: T;
}

export type PopupCallBackParam =
  | { state?: ButtonState }
  | ButtonState
  | undefined;

/** 공용 AbsPopupType 과 외부 설정 type 을 사용할수 있게 설정 */
export type PopupType = AbsPopupType | string;
/** Alert 창을 띄울때 message 만으로 띄울수 있게 설정 하기 위한 타입 */
export type AlertParam = string | { message: string; title?: string };
/** Confirm 창을 띄울때 설정 하는 변수 */
export type ConfirmParam = AlertParam;

/**
 * 팝업 화면 데이터
 * @prop {@link PopupType} type 팝업 타입 설정
 * @property {string} title 팝업 제목 설정
 * @property {number | string} width 팝업 타입 설정
 * @property {T} data 팝업 전달 데이터
 * @property {boolean} isClose 팝업 상단 X 버튼 여부
 * @property {Array<K>} buttons 생성될 버튼 설정
 * @property {React.FC<K>} buttonComponent 생성할 버튼 컴포넌트
 * @property {React.FC} buttonWrapper 하단 버튼 영역 수동 설정 컴포넌트
 * @property {@link PopupType} type 팝업 타입 설정
 * @property {@link PopupType} type 팝업 타입 설정
 */
export interface IPopupDo<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends IButton = any,
  U extends PopupCallBackParam = ButtonState
> {
  /** 팝업 타입 설정 */
  type: PopupType;
  /** 팝업 제목 설정 */
  title?: string;
  /** 팝업 가로 값 설정 default : 440 px */
  width?: number | string;
  /** 팝업 전달 데이터 */
  data?: T;
  /** 팝업 상단 X 버튼 여부 */
  isClose?: boolean;
  /** 생성될 버튼 설정 */
  buttons?: Array<K>;
  /** 생성할 버튼 컴포넌트 */
  buttonComponent?: React.FC<K>;
  /** 하단 버튼 영역 수동 설정 컴포넌트 */
  buttonWrapper?: React.FC;
  /** 최대 높이 설정 */
  maxHeight?: number;
  device?: "pc" | "mobile";
  /** 팝업 닫을때 실행될 콜백 함수 */
  callBack?: (value?: U) => void;
}
