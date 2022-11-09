import {
  configureStore,
  EnhancedStore,
  // TODO: 미들웨어를 다른방법으로 추가할수 있는 방법 찾아야함
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import logger from "redux-logger";
import rootReducer, { State } from "./index";

const store: EnhancedStore<State> = configureStore({
  // reducer 등록
  reducer: rootReducer,
  // 디버깅 미들웨어 등록
  // middleware: [...getDefaultMiddleware()],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: { store: () => store } },
      serializableCheck: false,
    })
      .concat
      // logger
      (),
  // 운영이 아닌곳에서만 데브툴 가능하게 처리
  devTools: process.env.REACT_APP_UI_ENV !== "production",
});

export default store;
