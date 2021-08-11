import {
  configureStore,
  EnhancedStore,
  // 미들웨어를 다른방법으로 추가할수 있는 방법 찾아야함
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./modules/index";

const store: EnhancedStore = configureStore({
  // reducer 등록
  reducer: rootReducer,
  // 디버깅 미들웨어 등록
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }).concat(
      logger
    ),
  // 운영이 아닌곳에서만 데브툴 가능하게 처리
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
