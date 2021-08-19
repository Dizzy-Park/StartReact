import io, { Socket } from "socket.io-client";
import { config } from "../../config/config";
import store from "../configureStore";
import { CONNECTED } from "../modules/soket/soketR";

const socket: Socket = io(config.Url.MESSAGE_URL as string, {
  autoConnect: false,
  transports: ["websocket"],
});

/**
 * 소켓 연결후 고유 키값 받아오기
 */
socket.on("connected", async (data: string) => {
  store.dispatch({ type: CONNECTED, payload: data });
});

/**
 * 소켓 연결
 */
export const connect: () => void = async () => {
  // 소켓 연결시 인증 토큰 추가
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth: any = {};
  auth[config.token.header] = sessionStorage.getItem(config.token.name);
  socket.auth = auth;
  socket.connect();
};
/**
 * 소켓 연결 끊기
 */
export const disconnect: () => void = async () => {
  socket.disconnect();
};
