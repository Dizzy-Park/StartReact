import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Http, { IRes } from "commons/Http";
import { createAppThunk } from "store/common";

// 이름 설정
const name = "user";
/**
 * 저장될 유저 정보 인터페이스 설정
 */
export interface IUser {
  reqId: string;
  id?: string;
  uname?: string;
}
/**
 * 서버와 통신할때 필요한 정보
 */
export interface IUserFetc {
  email: string;
  pwd: string;
}

export interface IResLogin {
  token: string;
  key: string;
}

/**
 * CSR 에서 로그인을 위한 서버통신 액션 함수
 * 비동기 함수를 생성 pending, fulfilled, rejected 를 실행되게
 */
export const fetchLogin = createAppThunk<IResLogin, IUserFetc>(
  `${name}/fetchLogin`,
  async params => {
    const res = await Http.post<IRes<IResLogin>>("/user/login", params);
    return res.data;
  }
);
/**
 * CSR 에서 로그아웃 처리를 위한 액션 함수
 */
export const fetchLogout = createAppThunk<string>(
  `${name}/fetchLogout`,
  async (_, thunkApi) => {
    const res = await Http.post<IRes<string>>("/user/logout");
    thunkApi.dispatch(logoutAction);
    return res.data;
  }
);

// data 를 관리하는 reducer 설정
const userSlice = createSlice({
  name,
  initialState: { reqId: "", id: "" } as IUser,
  reducers: {
    loginAction(state: IUser, action: PayloadAction<IUser>) {
      return { ...state, ...action.payload };
    },
    logoutAction() {
      return { reqId: "", id: "" };
    },
  },
});

/**
 * CSR 에서 쓰는 액션들
 */
export const { loginAction, logoutAction } = userSlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default userSlice.reducer;
