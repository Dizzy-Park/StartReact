import { useDispatch } from "react-redux";
import { AbsPopupType } from "../AbsPopupType";
import { rdxPopupClose, rdxPopupOpen } from "./popupR";
import {
  AlertParam,
  ButtonState,
  ConfirmParam,
  IButton,
  IPopupDo,
  PopupCallBackParam,
} from "./absPopupVo";
import { ICommonsStore } from "../..";
import { useSelectorEq } from "../../store/common";
import React from "react";

/**
 * @param type {@link AbsPopupType} 팝업 타입
 * @returns `close` 팝업 닫기
 */
export function useClosePopup(type: AbsPopupType | string) {
  const { callBack, returnData } = useSelectorEq((state: ICommonsStore) => ({
    callBack: state.popups.popup[type]?.callBack,
    returnData: state.popups.returnData[type],
  }));
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const close = async (state?: ButtonState, params?: any): Promise<void> => {
    if (callBack && typeof callBack === "function") {
      const st = state ? state : ButtonState.NO;
      if (returnData || params !== undefined) {
        callBack({ ...returnData, ...params, state: st });
      } else {
        callBack(st);
      }
    }
    dispatch(rdxPopupClose(type));
  };
  return { close, returnData };
}

/**
 * @param type {@link AbsPopupType} 팝업 타입
 * @returns `popupDo` 팝업 정보
 */
export function usePopupData<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends IButton = any,
  U extends PopupCallBackParam = ButtonState
>(type: AbsPopupType | string) {
  const { popupDo } = useSelectorEq((state: ICommonsStore) => ({
    popupDo: state.popups.popup[type] ? state.popups.popup[type] : undefined,
  }));
  return { popupDo: popupDo as IPopupDo<T, K, U> };
}

/**
 * AbsPopup 에서 사용되는 훅
 * @param type {@link AbsPopupType} 팝업 타입
 * @returns `width` 팝업의 가로 사이즈
 * @returns `type` {@link AbsPopupType} 팝업 타입
 * @returns `ButtonWrapper` 하단 버튼영역 대체 컴포넌트
 * @returns `maxHeight` 최대 높이값
 */
export function useAbsPopupData(type: AbsPopupType | string) {
  const { width, ButtonWrapper, maxHeight, device } = useSelectorEq(
    (state: ICommonsStore) => ({
      width: state.popups.popup[type].width,
      ButtonWrapper: state.popups.popup[type].buttonWrapper,
      maxHeight: state.popups.popup[type].maxHeight,
      device: state.popups.popup[type].device,
    })
  );
  return { width, type, ButtonWrapper, maxHeight, device };
}

/**
 * AbsPopupTitle 에서 사용되는 훅
 * @param type {@link AbsPopupType} 팝업 타입
 * @returns `title` 팝업 상탄 타이틀 정보
 * @returns `isClose` 상단 닫기 버튼 표시 여부
 * @returns `close` 닫을때 사용되는 함수
 */
export function useAbsPopupTitle(type: AbsPopupType | string) {
  const { title, isClose } = useSelectorEq((state: ICommonsStore) => ({
    title: state.popups.popup[type].title,
    isClose: state.popups.popup[type].isClose,
  }));
  const { close } = useClosePopup(type);
  return { title, isClose, close };
}

/**
 * AbsPopupButtonList 에서 사용되는 훅
 * @param type {@link AbsPopupType} 팝업 타입
 * @returns `buttonOption` 설정된 버튼 옵션
 * @returns `Button` 설정된 버튼 컴포넌트
 * @returns `close` 닫을때 사용되는 함수
 */
export function useAbsPopupButton(type: AbsPopupType | string) {
  const { buttonOption, Button } = useSelectorEq((state: ICommonsStore) => ({
    buttonOption: state.popups.popup[type].buttons,
    Button: state.popups.popup[type].buttonComponent,
  }));
  const { close } = useClosePopup(type);
  return { buttonOption, Button, close };
}

/**
 * 팝업 띄우기 위한 훅 설정
 * @returns `isPopup`
 * @returns `isPopup`
 */
function usePopup() {
  const { isPopup, popupDo } = useSelectorEq((state: ICommonsStore) => ({
    isPopup: state.popups.isPopup,
    popupDo: state.popups.popupAr,
  }));

  return {
    isPopup,
    popupDo,
  };
}

export default usePopup;

/**
 * @param buttonComponent 사용될 버튼컴포넌트 지정
 * @returns `alert` 안내창 띄움
 */
export function useAbsAlert<T>(
  buttonComponent?: React.FC<T>,
  width?: string | number
) {
  const dispatch = useDispatch();
  const alert = (params: AlertParam, callBack?: () => void) => {
    const message = typeof params === "string" ? params : params.message;
    const title = typeof params === "string" ? undefined : params.title;
    dispatch(
      rdxPopupOpen({
        type: AbsPopupType.ALERT,
        title: title,
        data: message,
        isClose: false,
        width: width,
        buttonComponent: buttonComponent,
        buttons: [{ text: "확인", state: ButtonState.OK }],
        buttonsList: [
          {
            component: buttonComponent,
            style: { text: "확인", state: ButtonState.OK },
          },
        ],
        callBack: callBack,
      } as IPopupDo<string>)
    );
  };
  return { alert };
}

/**
 * @param buttonComponent 사용될 버튼컴포넌트 지정
 * @returns `confirm` 확인창 띄움
 */
export function useAbsConfirm(
  buttonComponent?: React.FC,
  width?: string | number
) {
  const dispatch = useDispatch();
  const confirm = async (
    params: ConfirmParam,
    callBack?: (bo: boolean) => void
  ) => {
    const message = typeof params === "string" ? params : params.message;
    const title = typeof params === "string" ? undefined : params.title;
    dispatch(
      rdxPopupOpen({
        type: AbsPopupType.CONFIRM,
        title: title,
        data: message,
        width: width,
        isClose: false,
        buttonComponent: buttonComponent,
        buttons: [
          { text: "취소", state: ButtonState.NO },
          { text: "확인", state: ButtonState.OK },
        ],
        callBack: callBack,
      } as IPopupDo<string>)
    );
  };
  return { confirm };
}

/**
 * @returns `warning` 경고창 띄움
 */
export function useWarning() {
  const dispatch = useDispatch();
  const warning = async (message: string, title?: string) => {
    dispatch(
      rdxPopupOpen({
        type: AbsPopupType.WARNING,
        title,
        data: message,
        isClose: true,
        buttons: [],
      })
    );
  };
  return { warning };
}

/**
 * @param buttonComponent 사용될 버튼컴포넌트 지정
 * @returns `image` 이미지창 띄움
 */
export function useImagePopup(buttonComponent?: React.FC) {
  const dispatch = useDispatch();
  const image = async (
    children: React.ReactNode | React.ReactNode[],
    callBack?: () => void
  ) => {
    dispatch(
      rdxPopupOpen({
        type: AbsPopupType.ALERT,
        data: children,
        width: 500,
        isClose: false,
        buttons: [{ text: "닫기" }],
        buttonComponent: buttonComponent,
        callBack: callBack,
      })
    );
  };
  return { image };
}

/**
 * @param buttonComponent 사용될 버튼컴포넌트 지정
 * @returns `image` 이미지창 띄움
 */
export function useInputPopup(buttonComponent?: React.FC) {
  const dispatch = useDispatch();
  const input = async <T>(
    params: { result: T; title: string },
    callback?: (value: string) => void
  ) => {
    dispatch(
      rdxPopupOpen({
        title: params.title,
        type: AbsPopupType.INPUT,
        data: params.result,
        width: 500,
        buttons: [
          { text: "확인", state: ButtonState.OK },
          {
            text: "취소",
            state: ButtonState.NO,
          },
        ],
        buttonComponent: buttonComponent,
        callBack: callback,
      } as IPopupDo<T>)
    );
  };
  return { input };
}
