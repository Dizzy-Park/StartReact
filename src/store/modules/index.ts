import { AnyAction, ReducersMapObject } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loading, { ILoadingState } from "./loading/loadingR";
import security, { ISecurity } from "./security/securityR";
import soket, { ISocket } from "./soket/soketR";
import user, { IUser } from "./user/userR";
import popup, { IPopupState } from "./popup/popupR";

/**
 * state interface 설정
 */
export interface State {
  loading: ILoadingState;
  user: IUser;
  soket: ISocket;
  security: ISecurity;
  popup: IPopupState;
}

/**
 * 베이스 reducer 설정
 * @param state 상태를 담고있는 변수
 * @param action 행동에 의해 변화되는 값들
 * @returns
 */
// 리턴 타입이 무었인지 확인하여야 함
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    default:
      return combineReducers({
        loading,
        user,
        soket,
        security,
        popup,
      } as ReducersMapObject)(state, action);
  }
};
/**
 * RootState 에 대한 타입 정의
 */
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
