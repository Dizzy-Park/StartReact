/**
 * 가장가까운 tag정보 찾기
 * @param node 검사할 node
 * @param tag 찾을 tag 정보
 * @returns Element | null
 */
export function closest<K extends keyof HTMLElementTagNameMap>(
  node: Node | Element | HTMLElement | null | undefined,
  tag: K | string | Array<K | string>
) {
  const tagar = tag instanceof Array ? tag : [tag];

  while (node && node.parentElement) {
    if (node !== null && node !== undefined) {
      if (
        tagar.find(n => {
          if (n.indexOf(".") === -1) {
            return node?.nodeName.toLocaleLowerCase() === n.toLocaleLowerCase();
          } else {
            return (
              (node as Element).classList !== undefined &&
              (node as Element).classList.contains(n.split(".")[1])
            );
          }
        })
      ) {
        return node as Element;
      }
      node = node.parentElement;
    }
  }
  return null;
}

/**
 * @see {@link Selection}
 * @returns Selection | null
 */
export function selection() {
  if (document.getSelection !== null) {
    return document.getSelection();
  } else {
    return window.getSelection();
  }
}

/**
 * @see {@link Range}
 * @returns Range
 */
export function range() {
  const s = selection();
  if (s !== null && s.rangeCount !== 0) {
    return s.getRangeAt(0);
  }
  return document.createRange();
}

export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  element?: HTMLElement | Array<HTMLElement>
): HTMLElement;
export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  className?: string | string[],
  element?: HTMLElement | Array<HTMLElement>
): HTMLElement;
export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  p?: string | string[] | HTMLElement | Array<HTMLElement>,
  element?: HTMLElement | Array<HTMLElement>
): HTMLElement {
  const el = document.createElement(tagName);
  if (p) {
    if (typeof p === "string") {
      el.classList.add(p);
    } else if (p instanceof Array) {
      if (typeof p[0] === "string") {
        el.classList.add(...(p as string[]));
      } else {
        p.forEach(pi => el.appendChild(pi as HTMLElement));
      }
    } else {
      el.appendChild(p);
    }
  }
  if (element) {
    if (element instanceof Array) {
      el.append;
      element.forEach(pi => el.appendChild(pi as HTMLElement));
    } else {
      el.appendChild(element);
    }
  }
  return el;
}

/**
 * param정보로 img tag 제작 및 반환
 */
export function createImg(
  src: string,
  className?: string | string[],
  id?: string | number
) {
  function convertImageToBase64(
    imgUrl: string,
    callback: (result: string) => void
  ) {
    if (imgUrl.slice(0, 5).includes("http")) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        if (ctx) {
          ctx.drawImage(image, 0, 0);
        }
        const dataUrl = canvas.toDataURL();
        callback(dataUrl);
      };
      image.removeAttribute("srcset");
      image.src = imgUrl;
    } else {
      callback(imgUrl);
    }
  }

  const el = document.createElement("img");
  convertImageToBase64(src, src => {
    el.src = src;
  });

  if (el.src === "") {
    el.src = "";
    el.alt = "이미지를 첨부할 수 없습니다.";
  }

  el.setAttribute("width", "100%");

  if (className) {
    if (typeof className === "string") {
      el.classList.add(className);
    } else {
      el.classList.add(...className);
    }
  }
  if (id) {
    el.id = id.toString();
  }
  return el;
}

/**
 * param 정보로 input[type="file"]인 tag 제작및 반환
 */
export function createFileInput(
  accept?: string | string[],
  multiple?: boolean,
  className?: string | string[],
  id?: string
) {
  const el = document.createElement("input");
  el.id = "img_editor";
  el.setAttribute("type", "file");

  if (accept) {
    if (typeof accept === "string") {
      el.setAttribute("accept", accept);
    } else {
      el.setAttribute("accept", accept.join(","));
    }
  }

  if (multiple) {
    el.setAttribute("multiple", "true");
  }

  if (className) {
    if (typeof className === "string") {
      el.classList.add(className);
    } else {
      el.classList.add(...className);
    }
  }

  if (id) {
    el.id = id.toString();
  }

  return el;
}

/**
 * Range 요소 초기화
 */
export function resetRange(
  n?: Node | Range | null,
  noffset?: number,
  e?: Node | null,
  eoffset?: number
) {
  const s = selection();
  let r: Range;
  if (n instanceof Range) {
    r = n;
  } else if (noffset === undefined) {
    r = document.createRange();
    if (n !== undefined && n !== null) {
      r.selectNode(n);
    }
  } else {
    r = document.createRange();
    if (n !== undefined && n !== null) {
      r.setStart(n, noffset);
    }
  }
  if (e !== undefined && e !== null && eoffset !== undefined) {
    r.setEnd(e, eoffset);
  }
  if (s !== null) {
    s.removeAllRanges();
    s.addRange(r);
  }
}

export function changeParent(node: Node) {
  const p = node.parentElement;
  // console.log('changeParent 1', p.outerHTML)
  while (node.firstChild) {
    p?.insertBefore(node.firstChild, node);
  }
  // console.log('changeParent 2', p.outerHTML)
  p?.removeChild(node);
}

export function changeParents<K extends keyof HTMLElementTagNameMap>(
  doc: HTMLElement | Element,
  orgtag: K | "font",
  nottag: string
) {
  doc.querySelectorAll(orgtag).forEach(item => {
    if (!item.parentElement?.classList.contains(nottag)) {
      changeParent(item);
    }
  });
}

export function changeTag<K extends keyof HTMLElementTagNameMap>(
  node: Node,
  tag: K
) {
  const p = node.parentNode;
  const e = document.createElement(tag);
  while (node.firstChild) {
    e.appendChild(node.firstChild);
  }
  p?.replaceChild(e, node);
  return e;
}

export function eventRange(e: DragEvent) {
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(e.clientX, e.clientY);
  }
  // } else if (e.rangeParent) {
  //   const r = document.createRange();
  //   r.setStart(e.rangeParent, e.rangeOffset);
  //   return r;
  // }
}
