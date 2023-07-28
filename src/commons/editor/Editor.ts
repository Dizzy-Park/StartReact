import ES from "./EditorSetting";
import {
  changeParent,
  changeParents,
  changeTag,
  closest,
  createElement,
  createImg,
  eventRange,
  resetRange,
} from "./EditorUtils";
import type {
  EditorAction,
  EditorAlign,
  EditorSize,
  EditorStyle,
  EditorTool,
  EditorType,
  EditorValue,
  IRangeTarget,
} from "./EditorVo";

/**
 *
 * @param node {@link Element} | {@link Node}
 * @param tag {@link HTMLElementTagNameMap}
 * @param action {@link EditorAction}
 * @returns HTMLParagraphElement
 */
export function getTagElementAction<K extends keyof HTMLElementTagNameMap>(
  node: Element | Node,
  tag: K,
  action: EditorAction
) {
  const t = closest(node, tag);
  let p: Element | null = node as Element;
  const a = action === "next" ? "nextSibling" : "previousSibling";
  if (t === null) {
    // console.log(p.nodeType, p.parentNode.nodeType)
    while (p !== null && p.nodeType !== 1) {
      p = p.parentElement;
    }
  } else {
    while (p !== null && t.outerHTML !== p.outerHTML && p[a] === null) {
      p = p.parentElement;
    }
  }
  return p;
}
export interface ISibling {
  target: Node | null;
  action: EditorAction;
}
export function getSibling(
  target: Node | Element | null,
  action: EditorAction
): ISibling | undefined {
  const faname = action === "next" ? "nextSibling" : "previousSibling";
  const fbname = action === "next" ? "previousSibling" : "nextSibling";
  const aname = action === "next" ? "next" : "prev";
  const bname = action === "next" ? "prev" : "next";
  if (target !== null && target[faname]) {
    return { target: target[faname], action: aname };
  } else if (target !== null) {
    return { target: target[fbname], action: bname };
  } else {
    return undefined;
  }
}
export default class Editor extends ES {
  update?: (type: EditorTool, value: EditorValue) => void;
  resetType?: () => void;

  constructor(select?: string) {
    super();
    if (select) {
      ES._select = select;
    }
  }

  getType(e: MouseEvent | { target: Node }): EditorType {
    const t = e.target as Node;
    if (closest(t, ES.ENTER)) {
      return "text";
    } else if (closest(t, ES.IMG) !== null) {
      const img = closest(t, ES.IMG);
      if (img !== null) {
        img.classList.add(ES.toSELECT);
        setTimeout(() => {
          resetRange(img.firstElementChild);
        });
      }
      return "img";
    } else if (closest(t, ES.LINE)) {
      const line = closest(t, ES.LINE);
      if (line !== null) {
        line.classList.add(ES.toSELECT);
        setTimeout(() => {
          resetRange(line.firstElementChild);
        });
      }
      return "hr";
    } else if (closest(t, ES.BLOCK)) {
      return "block";
    }
    return "text";
  }

  updateTool(type: EditorType) {
    const r = this.range;
    const s = r.startContainer;
    let f: Element | null, b: HTMLElement | null;
    if (this.update) {
      switch (type) {
        case "text":
        case "block":
          this.update("bold", closest(s, "b") !== null);
          this.update("italic", closest(s, "i") !== null);
          this.update("underline", closest(s, "u") !== null);
          this.update("strikeThrough", closest(s, "s") !== null);
          switch (type) {
            case "text":
              f = closest(s, "a");
              if (f === null) {
                this.update("createLink", null);
              } else {
                this.update("createLink", (f as HTMLAnchorElement).href);
              }
              f = closest(s, ES.ENTER);
              if (f === null) {
                this.update("align", "left");
                this.update("indent", false);
              } else {
                this.update("align", (f as HTMLParagraphElement).align);
                this.update("indent", f.classList.contains("indent"));
              }
              f = closest(s, "font");
              if (f === null) {
                this.update("fontName", null);
                this.update("size", null);
                this.update("foreColor", null);
              } else {
                const k = f as HTMLFontElement;
                this.update("fontName", k.face ? k.face : null);
                this.update("size", k.size ? k.size : null);
                this.update("foreColor", k.color ? k.color : null);
              }
              f = closest(s, "span");
              if (f === null) {
                this.update("backColor", null);
              } else {
                b = f as HTMLElement;
                console.log(b.style.backgroundColor);
                if (b.style.backgroundColor !== "") {
                  this.update(
                    "backColor",
                    this.rgbToHex(b.style.backgroundColor)
                  );
                } else {
                  this.update("backColor", null);
                }
              }
              break;
            case "block":
              f = closest(s, ES.BLOCK);
              b = f as HTMLElement;
              for (const bs in b.classList) {
                switch (b.classList[bs] as EditorAlign) {
                  case "left":
                  case "right":
                  case "center":
                  case "justify":
                    this.update("align", b.classList[bs]);
                    break;
                }
              }
              if (b.style.color) {
                this.update("foreColor", this.rgbToHex(b.style.color));
              } else {
                this.update("foreColor", null);
              }
              if (b.style.backgroundColor) {
                this.update(
                  "backColor",
                  this.rgbToHex(b.style.backgroundColor)
                );
              } else {
                this.update("backColor", null);
              }
              break;
          }
          break;
        case "hr":
          b = document.querySelector(ES.SELECT + " span");
          if (b !== null) {
            for (const bs in b.classList) {
              switch (b.classList[bs] as EditorSize | EditorStyle) {
                case "large":
                case "middle":
                case "small":
                  this.update("size", b.classList[bs]);
                  break;
                case "solid":
                case "inset":
                case "double":
                case "dashed":
                  this.update("style", b.classList[bs]);
                  break;
              }
            }

            if (b.style.borderBottomColor) {
              this.update(
                "foreColor",
                this.rgbToHex(b.style.borderBottomColor)
              );
            } else {
              this.update("foreColor", null);
            }
          }
          break;
        case "img":
          b = document.querySelector(ES.SELECT + " img");
          if (b !== null) {
            for (const bs in b.classList) {
              switch (b.classList[bs] as EditorStyle) {
                case "fullImage":
                case "orgImage":
                  this.update("style", b.classList[bs]);
                  break;
              }
            }
          }
          break;
      }
    }
  }

  isParagraph(n: Node | null) {
    console.log("isParagraph", n, n?.nextSibling);
    if (n?.nextSibling === null) {
      const temp = document.createElement(ES.ENTER) as HTMLParagraphElement;
      temp.align = "left";
      temp.appendChild(document.createElement("br"));
      if (n.parentNode !== null) {
        n.parentNode.appendChild(temp);
      }
    }
  }

  toHex(st: string | number) {
    st = parseInt(st.toString(), 10).toString(16);
    st = st.length === 1 ? "0" + st : st;
    return st;
  }

  rgbToHex(rgb: string) {
    rgb = rgb.replace(/[^%,.\d]/g, "");
    const temp = rgb.split(",");
    const dump: Array<number> = [];
    for (let x = 0; x < 3; x++) {
      if (temp[x].indexOf("%") > -1)
        dump[x] = Math.round(parseFloat(temp[x]) * 2.55);
    }
    const r = this.toHex(dump[0]);
    const g = this.toHex(dump[1]);
    const b = this.toHex(dump[2]);
    return "#" + r + g + b;
  }

  parentChange(t: Node, n: Node) {
    if (n.parentNode !== t) {
      const p = n.parentNode;
      const pp = p !== null ? p.parentNode : null;
      if (p !== null && pp !== null) {
        pp.insertBefore(n, p);
        if (!p.childNodes.length) {
          pp.removeChild(p);
        }
      }
    }
  }

  pasteHTML(e: ClipboardEvent) {
    const d = e.clipboardData;
    if (d?.getData("text/html") === "") {
      return this.parseHTML(
        "<p>" + d.getData("text").replace(/\r\n/g, "</p><p>") + "</p>"
      );
    } else {
      return this.parseHTML(d?.getData("text/html"));
    }
  }

  paste(e: ClipboardEvent) {
    let st = "";
    const pHtml = this.pasteHTML(e);

    pHtml.childNodes.forEach(item => {
      switch (item.nodeType) {
        case 3:
          st += item.nodeValue;
          break;
        case 1:
          st += (item as Element).outerHTML;
          break;
      }
    });
    // console.log(st);
    document.execCommand("insertHTML", false, st);
    document.querySelectorAll(".u_editor " + ES.ENTER).forEach(item => {
      if ((item as HTMLParagraphElement).align === "") {
        (item as HTMLParagraphElement).align = "left";
      }
    });
    document.querySelectorAll("span[style]").forEach(n => {
      if (
        (n as HTMLElement).style.backgroundColor === "var(--bg-white)" &&
        n.classList.length === 0
      ) {
        changeParent(n);
      }
    });
    document.querySelectorAll("a[style]").forEach(n => {
      if (
        (n as HTMLElement).style.backgroundColor === "var(--bg-white)" &&
        n.classList.length === 0
      ) {
        n.removeAttribute("style");
      }
    });
    // this.updateTool();
  }

  removeTag<K extends keyof HTMLElementTagNameMap>(de: HTMLElement, tag: K) {
    de.querySelectorAll(tag).forEach(item =>
      item.parentNode?.removeChild(item)
    );
  }

  dragHTML(e: DragEvent) {
    return this.parseHTML(e.dataTransfer?.getData("text/html"));
  }

  parseHTML(st?: string) {
    const de = document.createElement("div");
    const clone = document.createElement("div");

    if (st !== undefined) {
      st = st.replace(new RegExp("<!--(.*?)-->", "gis"), "");
      st = st.replace(/<!\[if(.*?)\]>/gim, "").replace(/<!\[endif\]>/gim, "");
      st = st.replace(/<o:p><\/o:p>/gim, "").replace(/<o:p\/>/gim, "");
      st = st.replace(/\s+&nbsp;\s+/gim, "&nbsp;");
    } else {
      st = "";
    }

    clone.innerHTML = st;
    de.className = "u_tag";
    // 복사한요소 중 에디터에서 사용이 금지된 태그 제거
    this.removeTag(clone, "meta");
    this.removeTag(clone, "ul");
    this.removeTag(clone, "button");
    this.removeTag(clone, "style");
    this.removeTag(clone, "iframe");
    this.removeTag(clone, "script");
    this.removeTag(clone, "ins");
    this.removeTag(clone, "noscript");

    // 순수 텍스트로 이루어진 내용 remove
    clone.childNodes.forEach(item => {
      if (item.nodeType === 8) {
        clone.removeChild(item);
      }
    });

    // 최상단 DIV 또는 ARTICLE로 시작하는 내부요소 꺼내기
    while (clone.childNodes.length) {
      if (
        clone.firstChild &&
        (clone.firstChild.nodeName === "DIV" ||
          clone.firstChild.nodeName === "ARTICLE")
      ) {
        while (clone.firstChild.childNodes.length) {
          de.appendChild(clone.firstChild.childNodes[0]);
        }
        clone.firstChild.remove();
      } else if (clone.firstChild) {
        de.appendChild(clone.firstChild);
      }
    }

    // 태그치환작업 1치
    changeParents(de, "span", "u_tag");
    changeParents(de, "mark", "u_tag");
    changeParents(de, "a", "u_tag");
    changeParents(de, "u", "u_tag");
    changeParents(de, "div", "u_tag");

    // console.log(de.outerHTML);
    //TODO: <br><br> 연속 p 태그 치환작업 예정
    // de.querySelectorAll("br").forEach(item => {
    //   const ps = document.createElement("p");
    //   const pe = document.createElement("p");
    //   const pr = item.parentNode;
    //   const pp = pr?.parentNode;
    //   let bo = false;
    //   while (pr?.firstChild) {
    //     if (bo) {
    //       pe.appendChild(pr.firstChild);
    //     } else {
    //       if (pr.firstChild === item) {
    //         bo = true;
    //         pr.removeChild(item);
    //       } else {
    //         ps.appendChild(pr.firstChild);
    //       }
    //     }
    //   }
    //   setTimeout(() => {
    //     console.log(pp, item, pe.outerHTML, pr);
    //   });
    //   if (pr !== null) {
    //     pp?.replaceChild(pe, pr);
    //   }
    //   pp?.insertBefore(ps, pe);
    // });

    // p태그 내부 공백 스페이스 치환 작업
    de.querySelectorAll("p").forEach(ptag => {
      const temp = ptag.innerHTML;
      const NOSPACE = 8203;
      if (
        (temp.indexOf("&nbsp;") === 0 && temp.length <= 6) ||
        temp.charCodeAt(0) === NOSPACE
      ) {
        ptag.innerHTML = "<br>";
      }
    });

    // 테그 내부 이미지 요소 찾기
    {
      // figure 요소 치환
      de.querySelectorAll("div.u_tag > figure").forEach((item: Element) => {
        const imgTages = item.querySelectorAll("img");
        imgTages.forEach(item => {
          item.classList.add("fullImage");
          Object.keys(item.dataset).forEach(dataKey => {
            delete item.dataset[dataKey];
          });
          if (item.src.slice(0, 5).includes("http")) {
            item.src = "";
            item.removeAttribute("srcset");
            item.alt = "이미지를 첨부할수없습니다.";
          }
          item.setAttribute("width", "100%");
          item.id = Math.floor(
            Math.random() * (1000 - 1) + 1 + Date.now()
          ).toString();
        });
        item.removeAttribute("class");
        item.removeAttribute("style");
        item.classList.add("u_tag", "img");
        Object.keys((item as HTMLElement).dataset).forEach(dataKey => {
          delete (item as HTMLElement).dataset[dataKey];
        });
      });
      de.querySelectorAll("div.u_tag > img").forEach((item: Element) => {
        const figureNode = createElement(
          "figure",
          ["u_tag", "img"],
          createImg(
            (item as HTMLImageElement).src,
            ["fullImage"],
            Math.floor(Math.random() * (1000 - 1) + 1 + Date.now())
          )
        );
        const fic = createElement("figcaption");
        // fic.textContent = imgNode.alt ? imgNode.alt : "";
        figureNode.appendChild(fic);
        if (item.parentNode === de) {
          de.insertBefore(figureNode, item);
        }

        if (item.parentNode !== null && !item.classList.contains("u_tag")) {
          item.parentNode.removeChild(item);
        }
      });

      // p 태그내부 이미지 요소 찾기
      de.querySelectorAll("p").forEach(item => {
        const temp = item.querySelectorAll("img");
        if (temp.length > 0) {
          for (let index = 0; index < temp.length; index++) {
            const figureNode = createElement(
              "figure",
              ["u_tag", "img"],
              createImg(
                temp[index].src,
                ["fullImage"],
                Math.floor(Math.random() * (1000 - 1) + 1 + Date.now())
              )
            );
            const fic = createElement("figcaption");
            // fic.textContent = imgNode.alt ? imgNode.alt : "";
            figureNode.appendChild(fic);
            if (item.parentNode === de) {
              de.insertBefore(figureNode, item);
            }
          }
          if (item.parentNode !== null && !item.classList.contains("u_tag")) {
            item.parentNode.removeChild(item);
          }
        }
      });
      // div 태그내부 이미지 요소 찾기
      de.querySelectorAll("div").forEach(item => {
        const temp = item.querySelectorAll("img");
        if (temp.length > 0) {
          for (let index = 0; index < temp.length; index++) {
            const figureNode = createElement(
              "figure",
              ["u_tag", "img"],
              createImg(
                temp[index].src,
                ["fullImage"],
                Math.floor(Math.random() * (1000 - 1) + 1 + Date.now())
              )
            );
            const fic = createElement("figcaption");
            // fic.textContent = imgNode.alt ? imgNode.alt : "";
            figureNode.appendChild(fic);
            if (item.parentNode === de) {
              de.insertBefore(figureNode, item);
            }
          }
        }
        if (item.parentNode !== null && !item.classList.contains("u_tag")) {
          item.parentNode.removeChild(item);
        }
      });
      // table 태그내부 이미지 요소 찾기
      de.querySelectorAll("table").forEach(item => {
        const temp = item.querySelectorAll("img");
        if (temp.length > 0) {
          for (let index = 0; index < temp.length; index++) {
            const figureNode = createElement(
              "figure",
              ["u_tag", "img"],
              createImg(
                temp[index].src,
                ["fullImage"],
                Math.floor(Math.random() * (1000 - 1) + 1 + Date.now())
              )
            );
            const fic = createElement("figcaption");
            // fic.textContent = item. ? imgNode.alt : "";
            figureNode.appendChild(fic);
            if (item.parentNode === de) {
              de.insertBefore(figureNode, item);
            }
          }
          if (item.parentNode !== null && !item.classList.contains("u_tag")) {
            item.parentNode.removeChild(item);
          }
        }
      });

      de.querySelectorAll("section").forEach(item => {
        const temp = item.querySelectorAll("img");
        if (temp.length > 0) {
          for (let index = 0; index < temp.length; index++) {
            const figureNode = createElement(
              "figure",
              ["u_tag", "img"],
              createImg(
                temp[index].src,
                ["fullImage"],
                Math.floor(Math.random() * (1000 - 1) + 1 + Date.now())
              )
            );
            const fic = createElement("figcaption");
            // fic.textContent = item. ? imgNode.alt : "";
            figureNode.appendChild(fic);
            if (item.parentNode === de) {
              de.insertBefore(figureNode, item);
            }
          }
          if (item.parentNode !== null && !item.classList.contains("u_tag")) {
            item.parentNode.removeChild(item);
          }
        }
      });
    }

    // de.querySelectorAll("p").forEach(item => {
    //   if (item.outerText === "") {
    //     item.parentNode?.removeChild(item);
    //   } else {
    //     changeTag(item, "p");
    //   }
    // });
    de.querySelectorAll("p").forEach(item => {
      if (item.innerHTML.replace(/(^\s*)/gi, "").length === 0) {
        item.innerHTML = "<br>";
      }
    });

    if (de.lastChild?.nodeName !== "P") {
      const p = document.createElement("p");
      const br = document.createElement("br");
      p?.appendChild(br);
      de.appendChild(p);
    }
    return de;
  }

  copy(type: EditorType, e: ClipboardEvent) {
    const t = document.querySelector(ES.SELECT);
    const c = e.clipboardData;
    switch (type) {
      case "hr":
      case "img":
        if (t !== null) {
          c?.setData("text/html", t?.outerHTML);
        }
        e.preventDefault();
        break;
    }
  }

  cut(type: EditorType, e: ClipboardEvent) {
    // console.log("cut");
    const t = document.querySelector(ES.SELECT);
    const c = e.clipboardData;
    switch (type) {
      case "hr":
      case "img":
        if (t !== null) {
          c?.setData("text/html", t.outerHTML);
          t.parentNode?.removeChild(t);
        }
        e.preventDefault();
        break;
      default:
        document.execCommand("copy", undefined, undefined);
        e.preventDefault();
        // console.log(a.toString())
        // c.setData('text/html', t.outerHTML)
        break;
    }
  }

  dragstart(type: EditorType, e: DragEvent) {
    const t = document.querySelector(ES.SELECT);
    switch (type) {
      case "hr":
      case "img":
      case "section":
      case "point":
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "move";
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.clearData();
          if (t !== null) {
            e.dataTransfer.setData("text/html", t.outerHTML);
          }
        }
        break;
    }
  }

  drop(type: EditorType, e: DragEvent) {
    const t = document.querySelector(ES.SELECT);
    switch (type) {
      case "hr":
      case "section":
      case "point":
      case "img":
        resetRange(eventRange(e));
        t?.parentNode?.removeChild(t);
        if (e.dataTransfer) {
          document.execCommand(
            "insertHTML",
            false,
            e.dataTransfer.getData("text/html")
          );
        }
        resetRange(document.querySelector(ES.SELECT));
        e.preventDefault();
        break;
    }
  }

  command(
    type: EditorType,
    focus: Range | null,
    cmd: EditorTool,
    value: string | null
  ) {
    const r = this.range;
    let t = document.querySelector(ES.SELECT);
    let rn: IRangeTarget;
    let oh: HTMLElement | null, p: Element | null, h: HTMLElement;
    let bo: boolean;
    switch (cmd) {
      case "fontName":
        switch (type) {
          // case ES.TYPE_BLOCK :
          //   t = closest(r.startContainer, ES.BLOCK)
          //   t.classList.remove(ES.ALIGN_LEFT, ES.ALIGN_RIGHT, ES.ALIGN_CENTER, ES.ALIGN_JUSTIFY)
          //   t.classList.add(value)
          //   break
          default:
            this.defaultCommand(focus, cmd, value);
            break;
        }
        break;
      case "align":
        rn = ES.getRangeTarget(r);
        p = rn.end;
        t = rn.start;
        switch (type) {
          case "text":
            while (t !== null) {
              if (
                t.nodeName.toLocaleLowerCase() ===
                  ES.ENTER.toLocaleLowerCase() &&
                value !== null
              ) {
                (t as HTMLParagraphElement).align = value;
              }
              t = t !== p ? (t.nextSibling as Element | null) : null;
            }
            break;
          case "block":
            while (t !== null) {
              if (
                t.nodeName.toLocaleLowerCase() === ES.BLOCK.toLocaleLowerCase()
              ) {
                t.classList.remove("left", "rignt", "center", "justify");
                t.classList.add(value!);
              }
              t = t !== p ? (t.nextSibling as Element | null) : null;
            }
            break;
          case "index":
            while (t !== null) {
              if (t.classList.contains(ES.toINDEX)) {
                t.classList.remove("left", "rignt", "center", "justify");
                t.classList.add(value!);
              }
              t = t !== p ? (t.nextSibling as Element | null) : null;
            }
            break;
        }
        break;
      case "italic":
      case "bold":
        switch (type) {
          case "block":
            t = closest(r.startContainer, ES.BLOCK);
            resetRange(t);
            break;
        }
        document.execCommand(cmd, false, value === null ? undefined : value);
        break;
      case "insertHorizontalRule":
        resetRange(focus);
        h = createElement(
          "div",
          ["u_tag", "dragtarget", "line", ES.toSELECT],
          createElement("span", ["lage", "solid"])
        );
        document.execCommand("insertHTML", false, h.outerHTML);
        oh = document.querySelector(ES.SELECT);
        this.isParagraph(oh);
        resetRange(oh?.querySelector("span"));
        if (this.update) {
          this.update("type", "hr");
          this.update("size", "large");
          this.update("style", "solid");
        }
        break;
      case "insertImage":
        resetRange(focus);
        if (value) {
          h = createElement(
            "div",
            ["u_tag", "img", ES.toSELECT],
            createImg(
              value,
              ["fullImage"],
              Math.floor(Math.random() * (1000 - 1) + 1 + Date.now())
            )
          );
          bo = document.execCommand("insertHTML", false, h.outerHTML);
          oh = document.querySelector(ES.SELECT);
          console.log("select", bo, oh);
          this.isParagraph(oh);
          resetRange(oh?.querySelector("img"));
          if (this.update) {
            this.update("type", "img");
            this.update("style", "fullImage");
          }
        }
        break;
      case "createLink":
        if (value === null || value === "") {
          t = closest(focus?.startContainer, "a");
          // resetRange(t?.firstChild, 0, t?.lastChild, t?.lastChild?.length);
          document.execCommand("unlink", false);
        } else {
          // console.log("link check", value);
          if (
            value.indexOf("http://") === -1 &&
            value.indexOf("https://") === -1
          ) {
            value = "http://" + value;
          }
          const selection = document.getSelection();
          this.defaultCommand(focus, cmd, value);
          if (
            selection !== null &&
            selection.anchorNode !== null &&
            selection.anchorNode.parentElement !== null
          ) {
            (selection.anchorNode.parentElement as HTMLAnchorElement).target =
              "_blank";
          }
        }
        if (this.update) {
          this.update("createLink", value);
        }
        break;
      case "style":
        switch (type) {
          case "hr":
            p = t!.querySelector("span");
            p?.classList.remove("solid", "inset", "double", "dashed");
            if (value !== null) {
              p?.classList.add(value);
            }
            break;
          case "img":
            p = t!.querySelector("img");
            p?.classList.remove("fullImage", "orgImage");
            if (value !== null) {
              p?.classList.add(value);
            }
            break;
          case "block":
            t = closest(this.range.startContainer, ES.BLOCK);
            t?.classList.remove("mark_01", "mark_02", "mark_03", "mark_04");
            if (value !== null) {
              t?.classList.add(value);
            }
            break;
        }
        break;
      case "foreColor":
        switch (type) {
          case "hr":
            p = document.querySelector(ES.SELECT + " span");
            if (value === null) {
              // 스타일 초기화 방안
              // (p as HTMLElement).style = null;
            } else {
              (p as HTMLElement).style.borderBottomColor = value;
            }
            break;
          case "text":
            this.defaultCommand(focus, cmd, value);
            break;
          case "block":
            t = closest(focus?.startContainer, ES.BLOCK);
            if (value === null) {
              (t as HTMLElement).style.color = "";
            } else {
              (t as HTMLElement).style.color = value;
            }
            break;
        }
        break;
      case "backColor":
        // console.log(cmd, value);
        switch (type) {
          case "text":
            this.defaultCommand(focus, cmd, value);
            break;
          case "block":
            t = closest(focus?.startContainer, ES.BLOCK);
            // console.log(focus);
            if (value === null) {
              (t as HTMLElement).style.backgroundColor = "";
            } else {
              (t as HTMLElement).style.backgroundColor = value;
            }
            break;
        }
        break;
      case "size":
        switch (type) {
          case "text":
            // console.log("checksize", value);
            this.defaultCommand(focus, "fontSize", value);
            // switch (value) {
            //   case '4' :
            //     console.log('checksize', value)
            //     this.defaultCommand(focus, 'fontSize', 'large')
            //     break
            //   case '3' :
            //     this.defaultCommand(focus, 'fontSize', 'medium')
            //     break
            //   case '2' :
            //     this.defaultCommand(focus, 'fontSize', 'small')
            //     break
            //   case '1' :
            //     this.defaultCommand(focus, 'fontSize', 'x-small')
            //     break
            // }
            break;
          case "hr":
            p = t!.querySelector("span");
            p?.classList.remove("small", "middle", "large");
            if (value !== null) {
              p?.classList.add(value);
            }
            break;
        }
        break;
      case "delete":
        switch (type) {
          case "hr":
          case "img":
            value = value !== undefined ? value : "next";
            console.log(value);

            this.selectRemove(value as EditorAction);
            break;
          case "block":
            rn = ES.getRangeTarget(focus);
            p = rn.end;
            t = rn.start;
            h = t as HTMLElement;
            while (t !== null) {
              const bo = t !== p;
              if (
                t.nodeName.toLocaleLowerCase() === ES.BLOCK.toLocaleLowerCase()
              ) {
                if ((t as HTMLElement) === h) {
                  h = t = changeTag(t, ES.ENTER);
                  console.log(h);
                } else {
                  t = changeTag(t, ES.ENTER);
                }
                (t as HTMLParagraphElement).align = "left";
              }
              t = bo ? (t.nextSibling as Element | null) : null;
            }
            resetRange(h.firstChild, 0);
            if (this.resetType !== undefined) {
              setTimeout(() => {
                if (this.resetType !== undefined) {
                  this.resetType();
                }
              });
            }
            break;
        }
        break;
      case "indent":
        rn = ES.getRangeTarget(r);
        p = rn.end;
        t = rn.start;
        if (value) {
          while (t !== null) {
            if (t.nodeName === ES.ENTER) {
              t.classList.add(cmd);
            }
            t = t !== p ? (t.nextSibling as Element) : null;
          }
        } else {
          while (t !== null) {
            if (t.nodeName === ES.ENTER) {
              t.classList.remove(cmd);
            }
            t = t !== p ? (t.nextSibling as Element) : null;
          }
        }
        break;
      case "formatBlock":
        rn = ES.getRangeTarget(focus);
        p = rn.end;
        t = rn.start;
        h = t as HTMLElement;
        while (t !== null) {
          const bo = t !== p;
          if (t.nodeName === ES.ENTER) {
            changeParents(t, "span", "u_tag");
            changeParents(t, "b", "u_tag");
            changeParents(t, "i", "u_tag");
            changeParents(t, "u", "u_tag");
            changeParents(t, "font", "u_tag");
            changeParents(t, "s", "u_tag");
            if (t === h) {
              h = t = changeTag(t, ES.BLOCK);
            } else {
              t = changeTag(t, ES.BLOCK);
            }
            t.classList.add("mark_01", "left");
          }
          t = bo ? (t.nextSibling as Element) : null;
        }
        resetRange(h.firstChild, 0);
        setTimeout(() => {
          if (this.resetType !== undefined) {
            this.resetType();
          }
          this.isParagraph(h);
          console.log("create block");
        });
        break;
      // case "footnote":
      //   focus.insertNode(value.element);
      //   break;
      // case "section":
      //   t = document.querySelector(ES.SELECT);
      //   if (t) {
      //     resetRange(t.nextSibling, 0);
      //     t.classList.remove(ES.toSELECT);
      //   } else if (!closest(r.startContainer, ".u_textEdit")) {
      //     resetRange(focus);
      //   }
      //   value.classList.add(ES.toSELECT);
      //   document.execCommand("insertHTML", false, value.outerHTML);
      //   oh = document.querySelector(ES.SELECT);
      //   this.isParagraph(oh);
      //   resetRange(oh.childNodes[0]);
      //   this.update(ES.toolTYPE, ES.TYPE_SECTION);
      //   break;
      case "lastenter":
        t = document.querySelector(".u_editor");
        p = document.createElement(ES.ENTER);
        (p as HTMLParagraphElement).align = "left";
        p.appendChild(document.createElement("br"));
        t?.appendChild(p);
        resetRange(p.childNodes[0], 0);
        break;
      default:
        if (r) {
          this.defaultCommand(focus, cmd, value);
        }
    }
  }

  keydown(type: EditorType, e: KeyboardEvent) {
    let t: HTMLElement | null;
    const r = this.range;
    switch (e.keyCode || e.which) {
      case 8:
        // backspace
        // console.log('editor keydown', r)
        switch (type) {
          case "hr":
          case "img":
            this.command(type, null, "delete", "prev");
            e.preventDefault();
            break;
          case "block":
            if (r.startOffset === 0) {
              this.command(type, r, "delete", null);
              e.preventDefault();
            }
            break;
          case "text":
            if (r.startOffset === 0 && ES.isCollapsed) {
              if (this.removeElementIsType(r.startContainer, "prev")) {
                e.preventDefault();
              } else {
                t = document.querySelector(".u_editor");
                const nl = t?.querySelectorAll(ES.ENTER);
                if (
                  nl !== undefined &&
                  nl.length === 1 &&
                  escape(nl[0].outerText) === "%0A"
                ) {
                  e.preventDefault();
                }
              }
            }
            break;
          case "index":
            t = document.querySelector(".u_editor");
            if (t) {
              if (t.hasChildNodes()) {
                if (t.firstChild && t.firstChild?.nodeName !== ES.ENTER) {
                  t.removeChild(t.firstChild);
                }
              }
            }
            break;
        }

        break;
      case 13:
        // enter
        switch (type) {
          case "block":
            console.log("block enter");
            t = document.createElement("br");
            r.insertNode(t);
            resetRange(t.nextSibling, 0);
            e.preventDefault();
            break;
          case "hr":
          case "img":
            e.preventDefault();
            break;
        }
        break;
      case 32:
        switch (type) {
          case "hr":
          case "img":
            e.preventDefault();
            break;
        }
        break;
      case 46:
        // delete
        switch (type) {
          case "hr":
          case "img":
            this.command(type, null, "delete", "next");
            e.preventDefault();
            break;
          case "text":
            if (
              r.startOffset === (r.startContainer as Text).length &&
              ES.isCollapsed
            ) {
              if (this.removeElementIsType(r.startContainer, "next")) {
                e.preventDefault();
              }
            }
            break;
          case "block":
            if (r.startOffset === (r.startContainer as Text).length) {
              this.command(type, r, "delete", null);
              e.preventDefault();
            }
            break;
        }
        break;
      case 65:
        // a
        if (e.metaKey || e.ctrlKey) {
          document.querySelector(ES.SELECT)?.classList.remove("select");
          if (this.update) {
            // t = document.querySelector(".u_editor");
            // this.update(
            //   "type",
            //   t?.firstChild?.nodeName === ES.ENTER ? "text" : "img"
            // );
            this.update("type", "index");
          }
        }
        break;
      case 67:
        // c
        if (e.ctrlKey) {
          console.log("key");
          // console.log(editor.range)
        }
        break;
      case 37:
      case 38:
      case 39:
      case 40:
        if (closest(this.range.startContainer, ES.SELECT)) {
          resetRange(this.range.startContainer, 0);
        }
        if (this.resetType !== undefined) {
          setTimeout(() => {
            if (this.resetType !== undefined) {
              this.resetType();
            }
          });
        }
        break;
    }
  }

  removeElementIsType(node: Element | Node, action: EditorAction) {
    const p = getTagElementAction(node, ES.ENTER, action);
    const a = action === "next" ? "nextSibling" : "previousSibling";
    if (p !== null) {
      if (closest(p[a], ES.LINE) || closest(p[a], ES.IMG)) {
        const va = action === "next" ? "prev" : "next";
        (p[a] as Element)?.classList.add(ES.toSELECT);
        this.command("hr", null, "delete", va);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  keyup(e: KeyboardEvent) {
    switch (e.keyCode || e.which) {
      case 8:
        // backspace
        break;
    }
  }

  selectRemove(action: EditorAction) {
    const t = document.querySelector(ES.SELECT);
    const p = getSibling(t, action);
    t?.parentNode?.removeChild(t);
    if (p !== undefined) {
      this.moveFocus(p.target, p.action);
    }
  }

  moveFocus(target: Node | null, action: EditorAction) {
    if (target?.nodeName === ES.ENTER) {
      let c;
      switch (action) {
        case "prev":
          c = target.childNodes[target.childNodes.length - 1];
          resetRange(c, (c as Text).length);
          break;
        case "next":
          c = target.childNodes[0];
          resetRange(c, 0);
          break;
      }
      if (this.update !== undefined) {
        this.update("type", "text");
      }
    } else {
      resetRange(target);
      // this.mousedown({ target: target });
    }
  }

  defaultCommand(focus: Range | null, cmd: string, value?: string | null) {
    resetRange(focus);
    document.execCommand("styleWithCSS", false, undefined);
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand("removeFormat", false, cmd);
    }
  }
}
