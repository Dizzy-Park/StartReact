import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { State } from "..";
import { PopupType } from "../../../components/popup/PopupType";
import { IButton, IPopup, popupClose, popupOpen } from "./popupR";

export interface IPopupReturn<T> {
  isPopup: boolean;
  popupVo: IPopup<T>;
  close: () => Promise<void>;
  alert: (message: string) => Promise<void>;
  confirm: (message: string) => Promise<boolean>;
  openPopup: (data: IPopup<T>) => Promise<void>;
}

/**
 * 팝업 띄우기 위한 훅 설정
 * @returns IPopupReturn<T>
 */
function usePopup<T>(): IPopupReturn<T> {
  const { isPopup, popupVo } = useSelector((state: State) => state.popup);

  const dispatch = useDispatch();

  const close = useCallback(async (): Promise<void> => {
    dispatch(popupClose());
  }, []);

  const alert = useCallback(async (message: string): Promise<void> => {
    dispatch(
      popupOpen({
        type: PopupType.ALERT,
        data: message,
        isClose: false,
        buttons: [{ text: "확인", color: "primary", variant: "contained" }],
      } as IPopup<string>)
    );
  }, []);

  const confirm = useCallback(async (message: string): Promise<boolean> => {
    return new Promise((res, rej) => {
      try {
        dispatch(
          popupOpen({
            type: PopupType.CONFIRM,
            data: message,
            isClose: false,
            buttons: [
              { text: "확인", color: "primary", variant: "contained" },
              { text: "취소", color: "secondary", variant: "contained" },
            ],
            onResult: async (item: IButton) => {
              return res(item.color === "primary");
            },
          } as IPopup<string>)
        );
      } catch (err) {
        return rej(err);
      }
    });
  }, []);

  const openPopup = useCallback(async (data: IPopup<T>): Promise<void> => {
    dispatch(popupOpen(data));
  }, []);

  return {
    isPopup,
    popupVo,
    close,
    alert,
    confirm,
    openPopup,
  } as IPopupReturn<T>;
}

export default usePopup;
