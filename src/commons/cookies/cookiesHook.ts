import { useDispatch } from "react-redux";
import { rdxRemoveCookie, rdxSetCookie } from "./cookiesR";

/**
 * 쿠키 관련 훅
 * @returns `set` 쿠키등록 함수
 * @returns `get` 쿠키 값 함수
 * @returns `remove` 쿠키삭제 함수
 */
const useCookies = () => {
  const dispatch = useDispatch();

  const set = async (
    name: string,
    value: string,
    expire: string
  ): Promise<void> => {
    dispatch(rdxSetCookie({ name, value, expire }));
  };

  const get = async (name: string): Promise<string | undefined> => {
    const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? unescape(value[2]) : undefined;
  };

  const remove = async (name: string): Promise<void> => {
    dispatch(rdxRemoveCookie(name));
  };

  return { set, get, remove };
};
/**
 * Http 에서 직접 접속하기 위한 함수
 * @param name
 * @returns
 */
export async function getCookies(name: string): Promise<string | undefined> {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? unescape(value[2]) : undefined;
}
export default useCookies;
