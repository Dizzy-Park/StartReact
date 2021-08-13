import Socket from "socket.io-client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/config";

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

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: build => ({
    getMessages: build.query<ISocket, Channel>({
      query: channel => `messages/${channel}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = Socket(config.Url.MESSAGE_URL as string);
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (data: string) => {
            updateCachedData(draft => {
              draft.id = data;
            });
          };

          ws.on("connected", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

export const { useGetMessagesQuery } = api;

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
