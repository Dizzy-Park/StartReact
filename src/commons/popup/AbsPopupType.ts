import React, { lazy } from "react";

// NOTE: 공통 레이어팝업
const InputPopup = lazy(() => import("./display/InputPopup"));
const AlertOrConfirm = lazy(() => import("./display/AlertOrConfirm"));

export enum AbsPopupType {
  ALERT = "alert",
  CONFIRM = "confirm",
  WARNING = "waring",
  INPUT = "input",
}

const popups: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.LazyExoticComponent<React.ComponentType<any>>;
} = {
  [AbsPopupType.ALERT]: AlertOrConfirm,
  [AbsPopupType.CONFIRM]: AlertOrConfirm,
  [AbsPopupType.WARNING]: AlertOrConfirm,
  [AbsPopupType.INPUT]: InputPopup,
};

/**
 * 팝업 추가
 * @param key  팝업 타입 전달
 * @param popup 팝업 컴포넌트 전달
 *
 * ex) addPopup(PopupType.POSTCODE, lazy(() => import("./display/DaumPostCode")));
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addPopup<T = any>(
  key: string,
  popup: React.LazyExoticComponent<React.ComponentType<T>>
) {
  popups[key] = popup;
}

/**
 * 저장된 팝업 가져오기
 * @param key 팝업 타입
 * @returns 저장된 팝업 컴포넌트
 */
export function getPopup(key: string) {
  return popups[key];
}
