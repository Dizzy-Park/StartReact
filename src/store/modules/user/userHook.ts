import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLogin, fetchLogout, IUserFetc } from "./userR";
import { State } from "..";
import { addError, loadingOff, loadingOn } from "../loadingR";

export interface IUseUserReturn {
  id: string;
  uname: string;
  login: (data: IUserFetc) => Promise<void>;
  logout: () => Promise<void>;
  errorMessage?: string;
}

/**
 * user 정보 통신 훅 설정
 * @returns {id, uname, login, logout} as IUseUserReturn;
 */
const useUser = (): IUseUserReturn => {
  // 화면상에 표시될 값 설정
  const { id, uname } = useSelector((state: State) => state.user);
  const { errorMessage } = useSelector((state: State) => state.loading);
  const dispatch = useDispatch();
  /**
   * 로그인 Hook : fetchLogin 를 호출해서 pending, fulfilled, rejected 가 실행되게 처리
   */
  const login: (data: IUserFetc) => Promise<void> = useCallback(
    async (data: IUserFetc): Promise<void> => {
      // 입력값 검사
      if (data.email === "" || data.pwd === "") {
        // 에러 처리
        dispatch(addError("입력해라"));
      } else {
        dispatch(loadingOn());
        // 통신 호출 any 를 대체할 타입 확인 필요
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await dispatch(fetchLogin(data));
        if (res.payload.result) {
          // 성공시 페이지 이동
        } else {
          // 에러 처리
          dispatch(addError(res.payload.data));
        }
        dispatch(loadingOff());
        console.log("login", res);
      }
    },
    []
  );
  /**
   * 로그아웃 Hook
   */
  const logout: () => Promise<void> = useCallback(async (): Promise<void> => {
    dispatch(loadingOn());
    // 통신 호출 any 를 대체할 타입 확인 필요
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await dispatch(fetchLogout());
    if (res.payload.result) {
      // 성공시 페이지 이동
    } else {
      // 에러 처리
      dispatch(addError(res.payload.data));
    }
    dispatch(loadingOff());
  }, []);

  return { id, uname, errorMessage, login, logout } as IUseUserReturn;
};

export default useUser;
