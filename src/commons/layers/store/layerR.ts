import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRes } from "../../Http";
import { createThunk } from "../../store/common";
import { ILayerDo } from "./layerVo";

const name = "layers";

export interface ILayerState {
  isLayer: boolean;
  contentHeight?: () => DOMRect;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: ILayerDo<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returnData?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rdxLayers = createThunk<any, any, ILayerDo<any>>(
  `${name}/rdxLayers`,
  async (params, thunkApi) => {
    thunkApi.dispatch(rdxLayerOpen(params));
    return new Promise(res => {
      const unsubscribe = thunkApi.extra.store().subscribe(() => {
        const { layers } = thunkApi.getState();
        if (layers.returnData || layers.isLayer === false) {
          unsubscribe();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res({ code: 200, content: layers.returnData } as IRes<any>);
        }
      });
    });
  }
);

const layersSlice = createSlice({
  name,
  initialState: {
    isLayer: false,
    contentHeight: undefined,
  } as ILayerState,
  reducers: {
    rdxLayerOpen: (
      state: ILayerState,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<ILayerDo<any>>
    ) => {
      state.isLayer = true;
      state.data = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rdxLayerSelected(state: ILayerState, action: PayloadAction<any>) {
      state.returnData = action.payload;
    },
    rdxLayerClose(state: ILayerState) {
      state.isLayer = false;
      state.data = undefined;
      state.returnData = undefined;
    },
    rdxContentHeignt(state: ILayerState, action: PayloadAction<() => DOMRect>) {
      state.contentHeight = action.payload;
    },
  },
});

// export const LAYER_OPEN: string = layersSlice.actions.layerOpen.type;
// export const LAYER_CLISE: string = layersSlice.actions.layerClose.type;
/**
 * CSR 일때 접근하기 위한 action
 */
export const {
  rdxLayerOpen,
  rdxLayerClose,
  rdxLayerSelected,
  rdxContentHeignt,
} = layersSlice.actions;
export default layersSlice.reducer;
