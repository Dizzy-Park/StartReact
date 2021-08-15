import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { State } from "..";
import useLoading from "../loading/loadingHook";
import { fetchSecurity, logoutAction } from "./securityR";

export interface IUseSecurityReturn {
  key: string;
  slice: number;
  algorithm: string;
  getSecurity: () => Promise<void>;
  securityLogout: () => Promise<void>;
}

/**
 * user 정보 통신 훅 설정
 * @returns {id, uname, login, logout} as IUseUserReturn;
 */
const useSecurity = (): IUseSecurityReturn => {
  // 화면상에 표시될 값 설정
  const { key, slice, algorithm } = useSelector(
    (state: State) => state.security
  );
  const { alert, on, off } = useLoading();
  const dispatch = useDispatch();
  /**
   * 로그인 Hook : fetchLogin 를 호출해서 pending, fulfilled, rejected 가 실행되게 처리
   */
  const getSecurity: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      on();
      // 통신 호출 any 를 대체할 타입 확인 필요
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await dispatch(fetchSecurity());
      if (res.payload.result) {
        // 성공시 페이지 이동
      } else {
        // 에러 처리
        alert(res.payload.data);
      }
      off();
    }, []);
  /**
   * 로그아웃 Hook
   */
  const securityLogout: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      on();
      // 통신 호출 any 를 대체할 타입 확인 필요
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await dispatch(logoutAction());
      if (res.payload.result) {
        // 성공시 페이지 이동
      } else {
        // 에러 처리
        alert(res.payload.data);
      }
      off();
    }, []);
  return {
    key,
    slice,
    algorithm,
    getSecurity,
    securityLogout,
  } as IUseSecurityReturn;
};

export default useSecurity;
