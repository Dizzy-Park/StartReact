import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { ICommonsStore } from "../..";
import { useSelectorEq } from "../../store/common";
import {
  addLoadingThunkKey,
  rdxAddError,
  rdxRemoveAreaLoading,
  rdxSetAreaLoading,
  rdxSetLoading,
  rdxSetLoadingMessage,
  removeLoadingThunkKey,
} from "./loadingR";

/**
 * 로딩정보 hook
 * @see {boolean} isLoading 로딩 상태
 * @see {string} message 로딩 메세지
 * @returns () => {
    isLoading: boolean;
    message: LoadingMessageType;
  }
 */
export const useLoadingValue = (id?: string) => {
  // 화면상에 표시될 값 설정
  const { isLoading, message, areaLoading } = useSelectorEq(
    (state: ICommonsStore) => ({
      isLoading: state.loading?.isLoading,
      areaLoading: id ? state.loading?.area[id] : undefined,
      message: state.loading?.loadingMessage,
    })
  );
  return { isLoading, message, areaLoading };
};

/**
 * 로딩 상태 설정 hook
 * @returns `on` 로딩 켜기
 * @returns `off` 로딩 끄기
 * @returns `alert` 메시지
 */
export const useLoading = (id?: string, type?: string) => {
  const { isLoading, areaLoading } = useSelectorEq((state: ICommonsStore) => ({
    isLoading: state.loading?.isLoading,
    areaLoading: id ? state.loading?.area[id] : undefined,
  }));
  const dispatch = useDispatch();
  /**
   * loading 켜기
   */
  const on = async () => {
    if (id) {
      dispatch(rdxSetAreaLoading({ id, value: true }));
    } else {
      dispatch(rdxSetLoading(true));
    }
  };
  /**
   * loading 끄기
   */
  const off = async () => {
    if (id) {
      dispatch(rdxSetAreaLoading({ id, value: false }));
    } else {
      dispatch(rdxSetLoading(false));
    }
  };

  const message = (msg: string) => {
    dispatch(rdxSetLoadingMessage(msg));
  };

  const alert = async (message: string) => {
    dispatch(rdxAddError(message));
  };
  useEffect(() => {
    if (id && type) {
      addLoadingThunkKey(id, type);
      return () => {
        dispatch(rdxRemoveAreaLoading(id));
        removeLoadingThunkKey(id);
      };
    }
  }, []);
  return { isLoading, areaLoading, on, off, alert, message };
};

export default useLoading;
