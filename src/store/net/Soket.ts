import io, { Socket } from "socket.io-client";
import { config } from "../../config/config";
import store from "../configureStore";
import { CONNECTED } from "../modules/soket/soketR";

const socket: Socket = io(config.Url.MESSAGE_URL as string, {
  autoConnect: false,
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
  socket.connect();
};
/**
 * 소켓 연결 끊기
 */
export const disconnect: () => void = async () => {
  socket.disconnect();
};
