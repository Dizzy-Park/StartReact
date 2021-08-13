import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "loading";

export interface ILoadingState {
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: ILoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name,
  initialState,
  reducers: {
    loadingOn(state: ILoadingState) {
      return { ...state, isLoading: true };
    },
    loadingOff(state: ILoadingState) {
      return { ...state, isLoading: false };
    },
    addError(state: ILoadingState, action: PayloadAction<string>) {
      // 임시 경고 팝업
      alert(action.payload);
      return { ...state, errorMessage: action.payload };
    },
  },
});

/**
 * SSR 일때 호출할수 있게 따로 설정
 */
/**
 * 로딩 켜기
 */
export const LOADING_ON: string = loadingSlice.actions.loadingOn.type;
/**
 * 로딩 끄기
 */
export const LOADING_OFF: string = loadingSlice.actions.loadingOff.type;
/**
 * 에러 메시지 담기 (나중에 알럿이나 팝업으로 처리하기 위한 데이터)
 */
export const ADD_ERROR: string = loadingSlice.actions.addError.type;
/**
 * CSR 일때 접근하기 위한 action
 */
export const { loadingOn, loadingOff, addError } = loadingSlice.actions;
export default loadingSlice.reducer;
