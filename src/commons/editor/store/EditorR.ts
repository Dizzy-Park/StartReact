import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EditorType } from "../EditorVo";

const name = "editor";

export interface IEditor {
  editor: { type: EditorType };
}

const editorSlice = createSlice({
  name,
  initialState: {
    editor: { type: "text" as EditorType },
  },
  reducers: {
    rdxSetEditorType(state: IEditor, action: PayloadAction<EditorType>) {
      state.editor.type = action.payload;
    },
  },
});
export const { rdxSetEditorType } = editorSlice.actions;
export default editorSlice.reducer;
