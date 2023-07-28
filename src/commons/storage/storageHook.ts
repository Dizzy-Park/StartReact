import { useDispatch } from "react-redux";
import { rdxRemoveStorage, rdxSetStorage } from "./storageR";
import { Storage } from "./storageVo";

/**
 * localStorage 관리 Hook
 * ```tsx
 * const { set, get, remove } = useLocal();
 * ```
 */
export function useLocal() {
  const dispatch = useDispatch();
  const set = (key: string, value: string) => {
    dispatch(rdxSetStorage({ type: Storage.LOCAL, key, value }));
  };
  const remove = (key: string) => {
    dispatch(rdxRemoveStorage({ type: Storage.LOCAL, key }));
  };
  const get = (key: string) => {
    return localStorage.getItem(key);
  };
  return { set, get, remove };
}

/**
 * localStorage set 함수
 * @param {string} key localStorage 키
 * @param {T} value localStorage 설정값
 */
export function setLocal<T>(key: string, value: T) {
  switch (typeof value) {
    case "string":
      localStorage.setItem(key, value);
      break;
    default:
      localStorage.setItem(key, JSON.stringify(value));
      break;
  }
}

/**
 * localStorage get 함수
 * @param {string} key localStorage 키
 */
export function getLocal(key: string) {
  return localStorage.getItem(key);
}

/**
 * localStorage remove 함수
 * @param {string} key localStorage 키
 */
export function removeLocal(key: string) {
  return localStorage.removeItem(key);
}

/**
 * sessionStorage 관리 Hook
 * ```tsx
 * const { set, get, remove } = useLocal();
 * ```
 */
export function useSession() {
  const dispatch = useDispatch();
  const set = (key: string, value: string) => {
    dispatch(rdxSetStorage({ type: Storage.SESSION, key, value }));
  };
  const remove = (key: string) => {
    dispatch(rdxRemoveStorage({ type: Storage.SESSION, key }));
  };
  const get = (key: string) => {
    return sessionStorage.getItem(key);
  };
  return { set, get, remove };
}

/**
 * sessionStorage set 함수
 * @param {string} key sessionStorage 키
 * @param {T} value sessionStorage 설정값
 */
export function setSession(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

/**
 * sessionStorage get 함수
 * @param {string} key sessionStorage 키
 */
export function getSession(key: string) {
  return sessionStorage.getItem(key);
}

/**
 * sessionStorage remove 함수
 * @param {string} key sessionStorage 키
 */
export function removeSession(key: string) {
  return sessionStorage.removeItem(key);
}
