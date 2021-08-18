import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
import Http, { IRes } from "../../net/Http";
import { encript } from "../../net/Security";

const name = "security";

export interface ISecurity {
  key: string;
  slice: number;
  algorithm: string;
}

/**
 * CSR 에서 로그인을 위한 서버통신 액션 함수
 * 비동기 함수를 생성 pending, fulfilled, rejected 를 실행되게
 */
export const fetchSecurity: AsyncThunk<
  IRes<ISecurity>,
  void,
  { state: RootState }
> = createAsyncThunk<IRes<ISecurity>, void, { state: RootState }>(
  `${name}/fetchSecurity`,
  async (_, thunkApi) => {
    try {
      return getKey();
    } catch (err) {
      // 통신 실패 처리
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);
/**
 * SSR 일때 통신하기 위한 함수
 * @param params IUserFetc
 * @returns
 */
export const getKey: () => Promise<IRes<ISecurity>> = async (): Promise<
  IRes<ISecurity>
> => {
  const key = sessionStorage.getItem("key");
  const res: AxiosResponse<IRes<ISecurity>> = await Http.post("/user/key", {
    key: encript(key as string),
  });
  return res.data;
};

// data 를 관리하는 reducer 설정
const securitySlice = createSlice({
  name,
  initialState: { key: "", slice: 0, algorithm: "" } as ISecurity,
  reducers: {
    logoutAction() {
      return { key: "", slice: 0, algorithm: "" };
    },
  },
  extraReducers: builder => {
    // pending 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신하기전 호출되는 함수
    builder.addCase(fetchSecurity.pending, (state: ISecurity, action) => {
      return { ...state, reqId: action.meta.requestId };
    });
    // fulfilled 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신후 성공 하면 호출되는 함수
    builder.addCase(
      fetchSecurity.fulfilled,
      (state: ISecurity, { payload }) => {
        if (payload.result) {
          return { ...state, ...payload.data };
        } else {
          console.log(payload.data);
        }
      }
    );
    // rejected 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신이 실패 했을때 호출되는 함수
    builder.addCase(fetchSecurity.rejected, (state: ISecurity, action) => {
      console.log("실패", state, action);
    });
  },
});

/**
 * CSR 에서 쓰는 액션들
 */
export const { logoutAction } = securitySlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default securitySlice.reducer;
