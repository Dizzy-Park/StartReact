import { type Reducer } from "@reduxjs/toolkit";
import loading from "../loading/store/loadingR";
import popups from "../popup/store/popupR";
import ui from "../ui/uiR";

/**
 * 필요한 리듀서만 컴파일 되게 처리
 * 슬림하게 팝업과 로딩 그리고 ui 리듀서만 등록
 * @param addReduce 기본 외 추가될 리듀서
 * @returns
 */
export default function CommonsSlim(addReduce?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Reducer<any>;
}) {
  return {
    ...addReduce,
    loading,
    popups,
    ui,
  };
}
