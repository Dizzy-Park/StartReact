export type EditorType =
  | "text"
  | "hr"
  | "point"
  | "img"
  | "block"
  | "title"
  | "index"
  | "footnote"
  | "section";

export type EditorAlign = "left" | "right" | "center" | "justify";
export type EditorSize = "large" | "middle" | "small";
export type EditorStyle =
  | "solid"
  | "inset"
  | "double"
  | "dashed"
  | "fullImage"
  | "orgImage"
  | "mark_01"
  | "mark_02"
  | "mark_03"
  | "mark_04";

export type EditorTool =
  | "type"
  | "fontName"
  | "bold"
  | "italic"
  | "underline"
  | "strikeThrough"
  | "insertHorizontalRule"
  | "insertImage"
  | "formatBlock"
  | "align"
  | "size"
  | "style"
  | "foreColor"
  | "backColor"
  | "createLink"
  | "indent"
  | "delete"
  | "lastenter"
  | "footnote"
  | "section";

export interface IRangeTarget {
  start: Element | null;
  end: Element | null;
}

export type EditorAction = "next" | "prev";
export type EditorValue = string | Element | boolean | null;

/**
 * commend 패턴정의 interface
 * @property { (cmd: EditorType, value: string | null) => void} execute commend이벤트
 */
export interface ICommand {
  execute: () => void;
}

export interface ICommandParams {
  type: EditorType;
  value: string | null;
}
