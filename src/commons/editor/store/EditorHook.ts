import { shallowEqual, useSelector } from "react-redux";
import { rdxSetEditorType } from "./EditorR";
import { useDispatch } from "react-redux";
import type { EditorType } from "../EditorVo";
import type { ICommonsStore } from "commons";

export const useEditorInit = () => {
  const change = useEditorTypeAction();
  const { type } = useSelector(
    (state: ICommonsStore) => ({
      type: state.editor ? state.editor.editor.type : "text",
    }),
    shallowEqual
  );

  return { type, change };
};

export const useEditorTypeAction = () => {
  const dispatch = useDispatch();
  return (type: EditorType) => {
    dispatch(rdxSetEditorType(type));
  };
};
