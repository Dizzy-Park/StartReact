import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "..";
import { addError, loadingOff, loadingOn } from "../loading/loadingR";

export interface IUseLoadingReturn {
  isLoading: boolean;
  on: () => Promise<void>;
  off: () => Promise<void>;
  alert: (message: string) => Promise<void>;
}

const useLoading = (): IUseLoadingReturn => {
  // 화면상에 표시될 값 설정
  const { isLoading } = useSelector((state: State) => state.loading);
  const dispatch = useDispatch();

  const on: () => Promise<void> = useCallback(async (): Promise<void> => {
    dispatch(loadingOn());
  }, []);

  const off: () => Promise<void> = useCallback(async (): Promise<void> => {
    dispatch(loadingOff());
  }, []);

  const alert: (message: string) => Promise<void> = useCallback(
    async (message: string): Promise<void> => {
      dispatch(addError(message));
    },
    []
  );
  return { isLoading, on, off, alert } as IUseLoadingReturn;
};

export default useLoading;
