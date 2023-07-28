import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "./storageVo";

// 스토어 이름 설정
const name = "storage";

// data 를 관리하는 reducer 설정
const storageSlice = createSlice({
  name,
  initialState: {},
  reducers: {
    rdxSetStorage(
      _,
      action: PayloadAction<{ type: Storage; key: string; value: string }>
    ) {
      switch (action.payload.type) {
        case Storage.LOCAL:
          localStorage.setItem(action.payload.key, action.payload.value);
          break;
        case Storage.SESSION:
          sessionStorage.setItem(action.payload.key, action.payload.value);
          break;
      }
    },
    rdxRemoveStorage(_, action: PayloadAction<{ type: Storage; key: string }>) {
      switch (action.payload.type) {
        case Storage.LOCAL:
          localStorage.removeItem(action.payload.key);
          break;
        case Storage.SESSION:
          sessionStorage.removeItem(action.payload.key);
          break;
      }
    },
  },
});

/**
 * CSR 에서 쓰는 액션들
 */
export const { rdxSetStorage, rdxRemoveStorage } = storageSlice.actions;

// data 를 관리하는 reducer 기본 반환 설정
export default storageSlice.reducer;
