import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "socket";

export type Channel = "redux" | "general";

export interface Message {
  id: number;
  channel: Channel;
  userName: string;
  text: string;
}

export interface ISocket {
  id: string;
}

const soketSlice = createSlice({
  name,
  initialState: { id: "" } as ISocket,
  reducers: {
    connected(state: ISocket, action: PayloadAction<string>) {
      return { ...state, id: action.payload };
    },
    disconnected() {
      return { id: "" };
    },
  },
});

export const CONNECTED: string = soketSlice.actions.connected.type;
export const DISCONNECTED: string = soketSlice.actions.disconnected.type;
/**
 * CSR 에서 쓰는 액션들
 */
export const { connected, disconnected } = soketSlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default soketSlice.reducer;
