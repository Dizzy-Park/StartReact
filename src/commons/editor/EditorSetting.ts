import { closest, range, selection } from "./EditorUtils";
import type { IRangeTarget } from "./EditorVo";

export default class EditorSetting {
  public static _enter = "P";
  static _block = "blockquote";
  static _img = ".img";
  static _line = ".line";
  static _section = ".sectionline";
  static _select = ".select";
  static _index = ".u_index";
  static _pointline = ".pointline";

  static get ENTER() {
    return this._enter as keyof HTMLElementTagNameMap;
  }
  static get BLOCK() {
    return this._block as keyof HTMLElementTagNameMap;
  }
  static get IMG() {
    return this._img;
  }
  static get toIMG() {
    return this._img.split(".")[1];
  }
  static get LINE() {
    return this._line;
  }
  static get toLINE() {
    return this._line.split(".")[1];
  }
  static get POINTLINE() {
    return this._pointline;
  }
  static get toPOINTLINE() {
    return this._pointline.split(".")[1];
  }
  static get SECTION() {
    return this._section;
  }
  static get toSECTION() {
    return this._section.split(".")[1];
  }
  static get INDEX() {
    return this._index;
  }
  static get toINDEX() {
    return this._index.split(".")[1];
  }

  static get SELECT() {
    return this._select;
  }
  static get toSELECT() {
    return this._select.split(".")[1];
  }

  static get toSTRIKE() {
    return "strikethrough";
  }

  static get KEYDOWN() {
    return "edit_keydown";
  }
  static get SELECTION() {
    return "edit_selection";
  }
  static get MOUSEDOWN() {
    return "edit_mousedown";
  }
  static get COPY() {
    return "edit_copy";
  }
  static get CUT() {
    return "edit_cut";
  }
  static get PASTE() {
    return "edit_paste";
  }
  static get REMOVE() {
    return "edit_remove";
  }
  static get REMOVE_END() {
    return "edit_remove_end";
  }
  static get DRAGSTART() {
    return "edit_dragstart";
  }

  get selection() {
    return selection();
  }

  get range() {
    return range();
  }

  static get isCollapsed() {
    const s = selection();
    // console.log(s);

    if (s !== null && s.isCollapsed && s.anchorOffset === s.focusOffset) {
      return true;
    } else if (s !== null && closest(s.anchorNode, EditorSetting.SELECT)) {
      return true;
    }
    return false;
  }

  static getRangeTarget(r: Range | null): IRangeTarget {
    const tlist = [
      ".u_textEdit",
      EditorSetting.ENTER,
      EditorSetting.BLOCK,
      EditorSetting.INDEX,
      EditorSetting.LINE,
      EditorSetting.IMG,
      EditorSetting.SECTION,
    ];
    let sn = closest(r?.startContainer, tlist);
    let en = closest(r?.endContainer, tlist);
    // console.log(sn, en);
    if (sn !== null && sn.id === "u_textEdit") {
      sn = sn.firstChild as Element;
    }
    if (en !== null && en.id === "u_textEdit") {
      en = en.firstChild as Element;
    }
    return { start: sn, end: en };
  }

  // static hasSelection(focus: Range, checkNode, checkOne) {
  //   // console.log(focus instanceof Range)
  //   if (focus instanceof Range) {
  //     // console.log('focus', focus.toString())
  //   } else {
  //     //   if (focus instanceof Function) {
  //     //     checkOne = checkNode;
  //     //     checkNode = focus;
  //     //     focus = range();
  //     //   } else {
  //     //     focus = range();
  //     //   }
  //   }
  //   const s = selection();
  //   // console.log('hasSelection', s, focus.startContainer)
  //   const tlist = [
  //     ".u_textEdit",
  //     EditorSetting.ENTER,
  //     EditorSetting.BLOCK,
  //     EditorSetting.INDEX,
  //   ];
  //   if (s !== null) {
  //     console.log(s.anchorOffset, s.focusOffset);
  //     const ss = closest(s.anchorNode, ".u_textEdit");
  //     const sa = s.anchorNode;
  //     let si = -1;
  //     let ei = -1;
  //     if (ss !== null && sa !== null) {
  //       const sv = sa.nodeValue;
  //       if (sv !== null) {
  //         si = ss.outerHTML.indexOf(sv);
  //       }
  //     }
  //     const sf = s.focusNode;
  //     if (ss !== null && sf !== null) {
  //       const ev = sf.nodeValue;
  //       if (ev !== null) {
  //         ei = ss.outerHTML.indexOf(ev);
  //       }
  //     }

  //     let sn = closest(s.anchorNode, tlist);
  //     let en = closest(s.focusNode, tlist);
  //     if (si > ei) {
  //       const temp = en;
  //       en = sn;
  //       sn = temp;
  //     }
  //     // console.log(sn, en)
  //     if (sn !== null && sn.id === "u_textEdit") {
  //       sn = sn.firstChild as Element;
  //     }
  //     if (en !== null && en.id === "u_textEdit") {
  //       en = en.firstChild as Element;
  //     }
  //     const dump = [];
  //     let item;
  //     if (sn && en) {
  //       item = checkOne(sn);
  //       if (item) {
  //         dump.push(item);
  //       }
  //       item = checkOne(s.anchorNode);
  //       if (item) {
  //         dump.push(item);
  //       }
  //       let t = sn;
  //       while (t !== null) {
  //         checkNode(s, t, dump);
  //         if (t === en) {
  //           break;
  //         } else {
  //           console.log(t);
  //           t = t.nextSibling as Element;
  //         }
  //       }
  //       // console.log(s.anchorNode, s.extentNode, s.anchorNode !== s.extentNode)
  //       if (s.anchorNode !== s.focusNode) {
  //         item = checkOne(en);
  //       }
  //       if (item) {
  //         dump.push(item);
  //       }
  //       if (s.anchorNode !== s.focusNode) {
  //         item = checkOne(s.focusNode);
  //       }
  //       if (item) {
  //         dump.push(item);
  //       }
  //     }
  //     return [...new Set(dump)];
  //   }
  //   return undefined;
  // }
}
