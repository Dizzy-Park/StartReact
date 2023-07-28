import loading from "../loading/store/loadingR";
import popups from "../popup/store/popupR";
import ui from "../ui/uiR";
import storage from "../storage/storageR";
import layers from "../layers/store/layerR";
import cookies from "../cookies/cookiesR";
import type { Reducer } from "@reduxjs/toolkit";

/**
 * 모든 리듀서 추가처리
 * @param addReduce 기본 외 추가될 리듀서
 * @returns
 */
export default function CommonsFull(addReduce?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Reducer<any>;
}) {
  return {
    ...addReduce,
    loading,
    layers,
    popups,
    ui,
    storage,
    cookies,
  };
}
