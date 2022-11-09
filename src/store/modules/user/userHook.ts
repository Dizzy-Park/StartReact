import { useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchLogin, fetchLogout, IUserFetc } from "./userR";
import { State } from "../..";
import { useApi } from "store/common";
import useLoading from "commons/loading/store/loadingHook";

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
  const { on, off } = useLoading();
  const apiResult = useApi();
  /**
   * 로그인 Hook : fetchLogin 를 호출해서 pending, fulfilled, rejected 가 실행되게 처리
   */
  const login = useCallback(async (data: IUserFetc): Promise<void> => {
    on();
    // 통신 호출 any 를 대체할 타입 확인 필요
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await apiResult(fetchLogin, data);
    if (res?.content) {
      console.log(res);
    }
    console.log("login", res);
    off();
  }, []);
  /**
   * 로그아웃 Hook
   */
  const logout = useCallback(async (): Promise<void> => {
    on();
    // 통신 호출 any 를 대체할 타입 확인 필요
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await apiResult(fetchLogout);
    off();
  }, []);

  return { id, uname, login, logout } as IUseUserReturn;
};

export default useUser;
