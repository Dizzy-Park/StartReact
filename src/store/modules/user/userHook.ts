import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLogin, fetchLogout, IUserFetc } from "./userR";
import { State } from "..";
import useLoading from "../loading/loadingHook";
import { connect, disconnect } from "../../net/Soket";
import { disconnected } from "../soket/soketR";
import { fetchSecurity, logoutAction } from "../security/securityR";

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
  const { alert, on, off } = useLoading();
  const dispatch = useDispatch();
  /**
   * 로그인 Hook : fetchLogin 를 호출해서 pending, fulfilled, rejected 가 실행되게 처리
   */
  const login: (data: IUserFetc) => Promise<void> = useCallback(
    async (data: IUserFetc): Promise<void> => {
      on();
      // 통신 호출 any 를 대체할 타입 확인 필요
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await dispatch(fetchLogin(data));
      console.log(res);
      if (res.payload.result) {
        connect();
        // 통신 호출 any 를 대체할 타입 확인 필요
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await dispatch(fetchSecurity());
        console.log(res);

        if (res.payload.result) {
          // 성공시 페이지 이동
        } else {
          // 에러 처리
          alert(res.payload.error.message);
        }
        // 성공시 페이지 이동
      } else {
        // 에러 처리
        alert(res.payload.error.message);
      }
      console.log("login", res);
      off();
    },
    []
  );
  /**
   * 로그아웃 Hook
   */
  const logout: () => Promise<void> = useCallback(async (): Promise<void> => {
    on();
    // 통신 호출 any 를 대체할 타입 확인 필요
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await dispatch(fetchLogout());
    if (res.payload.result) {
      disconnect();
      dispatch(disconnected());
      dispatch(logoutAction());
      // 성공시 페이지 이동
    } else {
      // 에러 처리
      alert(res.payload.data);
    }
    off();
  }, []);

  return { id, uname, login, logout } as IUseUserReturn;
};

export default useUser;
