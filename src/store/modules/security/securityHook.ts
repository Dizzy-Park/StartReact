import { useSelector } from "react-redux";

import { State } from "..";

export interface IUseSecurityReturn {
  key: string;
  slice: number;
  algorithm: string;
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

  return {
    key,
    slice,
    algorithm,
  } as IUseSecurityReturn;
};

export default useSecurity;
