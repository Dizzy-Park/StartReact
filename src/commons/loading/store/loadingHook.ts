import { useDispatch } from "react-redux";
import { ICommonsStore } from "../..";
import { useSelectorEq } from "../../store/common";
import { rdxAddError, rdxSetLoading } from "./loadingR";

export const useLoadingValue = () => {
  // 화면상에 표시될 값 설정
  const { isLoading, message } = useSelectorEq((state: ICommonsStore) => ({
    isLoading: state.loading.isLoading,
    message: state.loading.loadingMessage,
  }));
  return { isLoading, message };
};

/**
 * @returns `on` 로딩 켜기
 * @returns `off` 로딩 끄기
 * @returns `alert` 메시지
 */
export const useLoading = () => {
  const { isLoading } = useSelectorEq((state: ICommonsStore) => state.loading);
  const dispatch = useDispatch();
  const on: () => Promise<void> = async (): Promise<void> => {
    dispatch(rdxSetLoading(true));
  };

  const off: () => Promise<void> = async (): Promise<void> => {
    dispatch(rdxSetLoading(false));
  };

  const alert: (message: string) => Promise<void> = async (
    message: string
  ): Promise<void> => {
    dispatch(rdxAddError(message));
  };
  return { isLoading, on, off, alert };
};

export default useLoading;
