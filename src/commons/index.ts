import layers, { ILayerState } from "./layers/store/layerR";
import loading, { ILoadingState } from "./loading/store/loadingR";
import popups from "./popup/store/popupR";
import { IPopupState } from "./popup/store/absPopupVo";
import ui, { IUi } from "./ui/uiR";
import storage from "./storage/storageR";
import cookies from "./cookies/cookiesR";

export interface ICommonsStore {
  loading: ILoadingState;
  layers: ILayerState;
  popups: IPopupState;
  ui: IUi;
}

const commons = {
  loading,
  layers,
  popups,
  ui,
  storage,
  cookies,
};

export default commons;
