import {
  type AnyAction,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { getLoadingMiddleware } from "commons/loading/store/loadingR";
// import logger from "redux-logger";
import rootReducer, { type IState } from ".";

export type Store = ReturnType<typeof initStore>;
export type Dispatch = Store["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IState,
  unknown,
  AnyAction
>;

const initStore = () => {
  const store = configureStore({
    // reducer 등록
    reducer: rootReducer,
    // preloadedState,
    // 디버깅 미들웨어 등록
    middleware: gDM =>
      gDM({
        thunk: {
          extraArgument: { store: () => store },
        },
        serializableCheck: false,
      }).prepend(getLoadingMiddleware()),
    // .concat(logger)
    // 운영이 아닌곳에서만 데브툴 가능하게 처리
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};

export default initStore();
