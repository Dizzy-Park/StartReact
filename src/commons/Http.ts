import axios, { type AxiosInstance } from "axios";
import { config } from "../config/config";

/**
 * axios 생성
 */
const Http: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_URL,
  headers: {
    // enctype: "multipart/form-data",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/hal+json",
  },
  paramsSerializer: {
    encode: encodeURIComponent,
    indexes: null,
  },
});

/**
 * 서버에서 반환되는 JSON 값 설정
 * 각 프로젝트 대응을 위해 RES 리턴을 상속 구현으로 변경처리
 */
export interface AbsIRes<T, P = undefined> {
  apiLink?: string;
  code: number;
  content?: T;
  success?: boolean;
  message: string;
  page?: P;
  status?: number;
}

export default Http;
