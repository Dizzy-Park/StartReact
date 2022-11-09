import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "loading";

export type LoadingMessageType = string | React.ReactElement | undefined;

export interface ILoadingState {
  isLoading: boolean;
  loadingMessage?: LoadingMessageType;
  errorMessage?: string;
}

const initialState: ILoadingState = {
  isLoading: false,
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
  },
});

/**
 * 에러 메시지 담기 (나중에 알럿이나 팝업으로 처리하기 위한 데이터)
 */
export const ADD_ERROR: string = loadingSlice.actions.rdxAddError.type;
/**
 * CSR 일때 접근하기 위한 action
 */
export const { rdxSetLoading, rdxSetLoadingMessage, rdxAddError } =
  loadingSlice.actions;
export default loadingSlice.reducer;
