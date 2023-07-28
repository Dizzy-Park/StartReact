import Editor from "commons/editor/Editor";
import {
  type EditorToolIcon,
  getEditorToolIcon,
} from "commons/editor/EditorTool";
import { selection } from "commons/editor/EditorUtils";
import type {
  EditorTool,
  EditorType,
  EditorValue,
} from "commons/editor/EditorVo";
import React, { useEffect } from "react";
import styled from "styled-components";
import Bold from "./editorAction/Bold";
import { EditorAction } from "./editorAction/EditorAction";
import Italic from "./editorAction/Italic";
import Align from "./editorAction/Align";
import EditorImage from "./editorAction/Image";
import { useEditorInit } from "./store/EditorHook";

const editor = new Editor();

const ToolBox = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  & ul {
    display: flex;
    flex-direction: row;
  }
  & img {
    width: 32px;
    height: 32px;
  }
`;

const EditorWa = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const EditorCon = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

const EditorBtn = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

interface IEditorToolIconProps {
  editorTool: EditorToolIcon;
}

function ToolIconButton({ editorTool }: IEditorToolIconProps) {
  const { type } = useEditorInit();
  const click = () => {
    const editorAction = new EditorAction();
    switch (editorTool) {
      case "bold":
        editorAction.setCommand(new Bold({ type, value: null }));
        break;
      case "italic":
        editorAction.setCommand(new Italic({ type, value: null }));
        break;
      case "fullImg":
        editorAction.setCommand(new EditorImage({ type, value: null }));
        break;
      case "alignLeft":
      case "alignCenter":
      case "alignRight":
        editorAction.setCommand(
          new Align({
            type,
            value: editorTool.replace("align", "").toLowerCase(),
          })
        );
        break;
      case "underline":
        editor.command(type, editor.range, "underline", "");
        break;
      default:
        break;
    }
  };
  return (
    <EditorBtn onClick={click} className={editorTool}>
      <img src={getEditorToolIcon(editorTool)} />
    </EditorBtn>
  );
}

export interface EditorToolBoxProps {
  toolType: EditorToolIcon[];
}

/**
 * 에디터 툴 컴포넌트
 * @param toolType {@link EditorToolBoxProps} 에디터 버튼타입
 * @returns JSX.Element
 */
export function EditorToolBox({ toolType }: EditorToolBoxProps): JSX.Element {
  return (
    <ToolBox className="tool-box">
      <ul>
        {toolType.map((editorType, index) => (
          <li key={index}>
            <ToolIconButton editorTool={editorType} />
          </li>
        ))}
      </ul>
    </ToolBox>
  );
}

/**
 * 에디터 컴포넌트 및 이벤트 관리
 * @returns JSX.Elemet
 */
export function EditorBody() {
  const { type, change } = useEditorInit();
  const editorBody = React.useRef<HTMLDivElement>(null);
  const update = (type: EditorTool, value: EditorValue) => {
    switch (type) {
      case "type":
        change(value as EditorType);
        break;
      case "style":
        break;
      case "strikeThrough":
        break;
      case "fontName":
        break;
      case "createLink":
        break;
      default:
        break;
    }
  };

  editor.update = update;

  editor.resetType = () => {
    if (document.querySelector(Editor.SELECT)) {
      document.querySelector(Editor.SELECT)?.classList.remove(Editor.toSELECT);
    }
    update("type", editor.getType({ target: editor.range.startContainer }));
  };

  const mouseDown = (e: React.MouseEvent) => {
    if (document.querySelector(Editor.SELECT)) {
      document.querySelector(Editor.SELECT)?.classList.remove(Editor.toSELECT);
    }
    update("type", editor.getType(e.nativeEvent));
  };

  const mouseUp = () => {
    setTimeout(() => {
      editor.updateTool(type);
    });
  };

  const copy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    editor.copy(type, e.nativeEvent);
  };

  const keyDown = (e: React.KeyboardEvent) => {
    if (Editor.isCollapsed) {
      if (!e.defaultPrevented) {
        if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
          editor.keydown(type, e.nativeEvent);
        }
      }
    } else {
      switch (e.keyCode || e.which) {
        case 16:
        case 17:
        case 27:
        case 37:
        case 38:
        case 39:
        case 40:
          break;
        default:
          if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
            editor.keydown(type, e.nativeEvent);
          }
          break;
      }
    }
  };

  const cut = (e: React.ClipboardEvent) => {
    if (!e.defaultPrevented) {
      editor.cut(type, e.nativeEvent);
      const s = selection();
      if (
        (s?.anchorOffset === 0 &&
          s.focusOffset === 0 &&
          s.isCollapsed === false) ||
        s?.anchorOffset !== s?.focusOffset
      ) {
        document.execCommand("delete", undefined, undefined);
      }
    } else {
      update("type", editor.getType({ target: editor.range.startContainer }));
    }
  };

  const paste = (e: React.ClipboardEvent) => {
    editor.paste(e.nativeEvent);
    e.preventDefault();
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    editor.dragstart(type, e.nativeEvent);
  };

  const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    editor.drop(type, e.nativeEvent);
  };

  const editorInit = () => {
    const p = document.createElement("p");
    const br = document.createElement("br");
    p?.appendChild(br);
    editorBody.current?.appendChild(p);
  };

  useEffect(() => {
    document.execCommand("defaultParagraphSeparator", false, Editor.ENTER);
    editorInit();
    editorBody.current?.focus();
  }, []);

  return (
    <EditorCon
      ref={editorBody}
      contentEditable
      className="u_editor"
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onCopy={copy}
      onKeyDown={keyDown}
      onCut={cut}
      onPaste={paste}
      onDragStart={dragStart}
      onDrop={dragDrop}
    />
  );
}

function ReactEditor() {
  return (
    <EditorWa>
      <ToolBox>
        <ul>
          <li>
            <ToolIconButton editorTool="bold" />
          </li>
          <li>
            <img src={getEditorToolIcon("italic")} />
          </li>
          <li>
            <img src={getEditorToolIcon("underline")} />
          </li>
          <li>
            <img src={getEditorToolIcon("strike")} />
          </li>
          <li>
            <img src={getEditorToolIcon("alignLeft")} />
          </li>
          <li>
            <img src={getEditorToolIcon("alignCenter")} />
          </li>
          <li>
            <img src={getEditorToolIcon("alignRight")} />
          </li>
          <li>
            <img src={getEditorToolIcon("alignJustify")} />
          </li>
          <li>
            <img src={getEditorToolIcon("indent")} />
          </li>
          <li>
            <img src={getEditorToolIcon("line")} />
          </li>
          <li>
            <img src={getEditorToolIcon("block")} />
          </li>
          <li>
            <img src={getEditorToolIcon("link")} />
          </li>
          <li>
            <img src={getEditorToolIcon("fontColor")} />
          </li>
          <li>
            <img src={getEditorToolIcon("fullImg")} />
          </li>
          <li>
            <img src={getEditorToolIcon("orgImg")} />
          </li>
          <li>
            <img src={getEditorToolIcon("remove")} />
          </li>
          <li>
            <img src={getEditorToolIcon("enter")} />
          </li>
        </ul>
      </ToolBox>
      <EditorBody />
    </EditorWa>
  );
}

export default ReactEditor;
