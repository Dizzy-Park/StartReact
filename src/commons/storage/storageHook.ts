import { useDispatch } from "react-redux";
import { rdxRemoveStorage, rdxSetStorage } from "./storageR";
import { Storage } from "./storageVo";

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

export function getLocal(key: string) {
  return localStorage.getItem(key);
}

export function removeLocal(key: string) {
  return localStorage.removeItem(key);
}

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

export function setSession(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function getSession(key: string) {
  return sessionStorage.getItem(key);
}

export function removeSession(key: string) {
  return sessionStorage.removeItem(key);
}
