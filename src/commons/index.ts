import layers, { type ILayerState } from "./layers/store/layerR";
import loading, { type ILoadingState } from "./loading/store/loadingR";
import popups from "./popup/store/popupR";
import type { IPopupState } from "./popup/store/absPopupVo";
import ui from "./ui/uiR";
import storage from "./storage/storageR";
import cookies from "./cookies/cookiesR";
import editor from "./editor/store/EditorR";
import type { IEditor } from "./editor/store/EditorR";
import type { IUi } from "./ui/uiVo";

export interface ICommonsStore {
  loading?: ILoadingState;
  layers?: ILayerState;
  editor?: IEditor;
  popups: IPopupState;
  ui: IUi;
}

export enum CommonType {
  Loading = 1,
  Layers = 2,
  Ui = 4,
  Storage = 8,
  Cookies = 16,
  Editor = 32,
}

/**
 * 리덕스에 탑제할 모듈 선택의 총 값을 합해주는 함수
 * @param type CommonType | CommonSetting
 * @returns number
 */
export const getCommonsType = (type: Array<number>): number => {
  let t = 0;
  type.forEach(k => (t += k));
  return t;
};

export enum CommonSetting {
  Full = getCommonsType([
    CommonType.Loading,
    CommonType.Layers,
    CommonType.Ui,
    CommonType.Storage,
    CommonType.Cookies,
    CommonType.Editor,
  ]),
  Slim = getCommonsType([CommonType.Ui, CommonType.Loading]),
  Middle = getCommonsType([
    CommonType.Ui,
    CommonType.Loading,
    CommonType.Storage,
  ]),
}

/**
 * 리덕스에 추가할 모듈만 추가하게 처리해주는 함수
 * @param type 추가될 모듈 총 번호 합
 * @returns 리덕스 모듈
 * @deprecated CommonsSlim, CommonsMiddle, CommonsFull 로 변경
 */
export const getCommons = (type: number) => {
  const commons: {
    loading?: typeof loading;
    layers?: typeof layers;
    popups: typeof popups;
    ui?: typeof ui;
    storage?: typeof storage;
    cookies?: typeof cookies;
    editor?: typeof editor;
  } = { popups };
  if (type & CommonType.Loading) {
    commons.loading = loading;
  }
  if (type & CommonType.Layers) {
    commons.layers = layers;
  }
  if (type & CommonType.Ui) {
    commons.ui = ui;
  }
  if (type & CommonType.Storage) {
    commons.storage = storage;
  }
  if (type & CommonType.Cookies) {
    commons.cookies = cookies;
  }
  if (type & CommonType.Editor) {
    commons.editor = editor;
  }
  return commons;
};
