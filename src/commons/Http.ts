import axios, { AxiosInstance } from "axios";
import { config } from "config/config";

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
 */
export interface IRes<T> {
  apiLink?: string;
  code: number;
  content?: T;
  message: string;
}

export default Http;

/**
 * v2 연결
 */
export const Http2: AxiosInstance = axios.create({
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
 * 이전 api 연결
 */
export const HttpR: AxiosInstance = axios.create({
  baseURL: "",
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
