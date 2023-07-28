import {
  createSlice,
  type AnyAction,
  type Middleware,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ICommonsStore } from "commons";

const name = "loading";

export type LoadingMessageType = string | React.ReactElement | undefined;

const loadingMiddlewareKey: Array<string> = [];
const loadingMiddlewareType: Array<string> = [];
/**
 * 이 코드는 `addLoadingThunkKey` 함수를 정의하는 코드입니다.
 * 이 함수는 `key`와 `type` 매개변수를 받아서 `loadingMiddlewareKey`와 `loadingMiddlewareType` 배열에 추가하는 역할을 합니다.
 * @param key
 * @param type
 */
export function addLoadingThunkKey(key: string, type: string) {
  if (
    typeof window !== "undefined" &&
    loadingMiddlewareKey.indexOf(key) === -1
  ) {
    loadingMiddlewareKey.push(key);
    loadingMiddlewareType.push(type);
  }
}

/**
 * 이 코드는 `loadingMiddlewareKey` 배열에서 주어진 `key` 값을 찾아서 제거하는 함수입니다.
 * @param key
 */
export function removeLoadingThunkKey(key: string) {
  const idx = loadingMiddlewareKey.indexOf(key);
  if (typeof window !== "undefined" && idx !== -1) {
    loadingMiddlewareKey.splice(idx, 1);
    loadingMiddlewareType.splice(idx, 1);
  }
}

export interface ILoadingState {
  isLoading: boolean;
  area: { [key: string]: boolean };
  loadingMessage?: LoadingMessageType;
  errorMessage?: string;
}

const initialState: ILoadingState = {
  isLoading: false,
  area: {},
};

const loadingSlice = createSlice({
  name,
  initialState,
  reducers: {
    rdxSetLoading(state: ILoadingState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    rdxSetLoadingMessage(
      state: ILoadingState,
      action: PayloadAction<LoadingMessageType>
    ) {
      state.loadingMessage = action.payload;
    },
    rdxAddError(state: ILoadingState, action: PayloadAction<string>) {
      // 임시 경고 팝업
      alert(action.payload);
      return { ...state, errorMessage: action.payload };
    },
    rdxSetAreaLoading(
      state: ILoadingState,
      action: PayloadAction<{ id: string; value: boolean }>
    ) {
      state.area[action.payload.id] = action.payload.value;
    },
    rdxRemoveAreaLoading(state: ILoadingState, action: PayloadAction<string>) {
      delete state.area[action.payload];
    },
  },
});

/**
 * 이 코드는 Redux 미들웨어로서, 액션이 디스패치될 때마다 로딩 상태를 관리하는 역할을 합니다.
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getLoadingMiddleware = (): Middleware<{}, ICommonsStore> => {
  return store => next => (action: AnyAction) => {
    if (typeof window !== "undefined" && typeof action.type === "string") {
      const t = action.type as string;
      const type = t
        .replace("/pending", "")
        .replace("/fulfilled", "")
        .replace("/rejected", "");
      const idx = loadingMiddlewareType.indexOf(type);
      if (idx !== -1) {
        const key = loadingMiddlewareKey[idx];
        const loading = store.getState().loading;
        if (t.indexOf("pending") !== -1) {
          if (loading !== undefined) {
            store.dispatch(rdxSetAreaLoading({ id: key, value: true }));
          }
        }
        if (t.indexOf("fulfilled") !== -1) {
          if (loading !== undefined) {
            if (typeof window !== "undefined") {
              setTimeout(() => {
                store.dispatch(rdxSetAreaLoading({ id: key, value: false }));
              });
            } else {
              store.dispatch(rdxSetAreaLoading({ id: key, value: false }));
            }
          }
        }
      }
    }
    return next(action);
  };
};

/**
 * 에러 메시지 담기 (나중에 알럿이나 팝업으로 처리하기 위한 데이터)
 */
export const ADD_ERROR: string = loadingSlice.actions.rdxAddError.type;
/**
 * CSR 일때 접근하기 위한 action
 */
export const {
  rdxSetLoading,
  rdxSetLoadingMessage,
  rdxAddError,
  rdxSetAreaLoading,
  rdxRemoveAreaLoading,
} = loadingSlice.actions;
export default loadingSlice.reducer;
