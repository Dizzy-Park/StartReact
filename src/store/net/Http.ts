import axios, { type AxiosInstance } from "axios";
import { config } from "../../config/config";

/**
 * axios 생성
 */
const Http: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_URL,
  headers: {
    enctype: "multipart/form-data",
  },
});

/**
 * 서버에서 반환되는 JSON 값 설정
 */
export interface IRes<T> {
  result: boolean;
  data?: T;
  error?: null | IResError;
  // 아직 확인되지 않음
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

export interface IResError {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export default Http;
