import React from "react";

export const isTarget = (
  e: MouseEvent,
  r: React.MutableRefObject<null>
): boolean => {
  const k = e.composedPath();
  return k.findIndex(t => t === r.current) !== -1;
};

export const mouseUp = (
  r: React.MutableRefObject<null>,
  c: (value: boolean) => void,
  d?: React.MutableRefObject<null>
): void => {
  const mouseUpHandler = (e: MouseEvent) => {
    if (!isTarget(e, r)) {
      c(false);
    }
    if (d) {
      if (!isTarget(e, d)) {
        document.removeEventListener("mouseup", mouseUpHandler);
      }
    } else {
      document.removeEventListener("mouseup", mouseUpHandler);
    }
  };
  document.addEventListener("mouseup", mouseUpHandler);
};

export const isFullDate = (value: string): boolean => {
  const regex = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  return regex.test(value);
};

export const getSearchRegExp = (value: string): RegExp => {
  let st = "";
  for (let i = 0; i < value.length; i++) {
    st += getMath(value[i]);
  }
  return new RegExp(st);
};

export const getMath = (value: string): string => {
  switch (value) {
    case "ㄱ":
      return "[가-깋]";
    case "ㄲ":
      return "[까-깧]";
    case "ㄴ":
      return "[나-닣]";
    case "ㄷ":
      return "[다-딯]";
    case "ㄸ":
      return "[따-띻]";
    case "ㄹ":
      return "[라-맇]";
    case "ㅁ":
      return "[마-밓]";
    case "ㅂ":
      return "[바-빟]";
    case "ㅃ":
      return "[빠-삫]";
    case "ㅅ":
      return "[사-싷]";
    case "ㅆ":
      return "[싸-앃]";
    case "ㅇ":
      return "[아-잏]";
    case "ㅈ":
      return "[자-짛]";
    case "ㅉ":
      return "[짜-찧]";
    case "ㅊ":
      return "[차-칳]";
    case "ㅋ":
      return "[카-킿]";
    case "ㅌ":
      return "[타-팋]";
    case "ㅍ":
      return "[파-핗]";
    case "ㅎ":
      return "[하-힣]";
    case "ㅛ":
      return "y";
    case "ㅕ":
      return "u";
    case "ㅐ":
    case "ㅒ":
      return "o";
    case "ㅔ":
    case "ㅖ":
      return "p";
    case "ㅗ":
      return "h";
    case "ㅓ":
      return "j";
    case "ㅏ":
      return "k";
    case "ㅣ":
      return "l";
    case "ㅠ":
      return "b";
    case "ㅜ":
      return "n";
    case "ㅡ":
      return "m";
    case "+":
    case "(":
    case ")":
    case "[":
    case "]":
    case "*":
    case '"':
    case "'":
    case "\\":
      return `\\${value}`;
    default:
      return value;
  }
};

export function dataUrlToBlob(d: string) {
  const BASE64 = ";base64,";
  let p;
  if (d.indexOf(BASE64) === -1) {
    p = d.split(",");
    return new Blob([p[1]], { type: p[0].split(":")[1] });
  }
  p = d.split(BASE64);
  const r = window.atob(p[1]);
  const max = r.length;
  const u8 = new Uint8Array(max);
  let i = 0;
  while (i < max) {
    u8[i] = r.charCodeAt(i);
    i++;
  }
  return new Blob([u8], { type: p[0].split(":")[1] });
}

export const wait = (delay: number) => {
  return new Promise((res, rej) => {
    try {
      setTimeout(res, delay);
    } catch (err) {
      rej(err);
    }
  });
};

export async function forEachPromise<T, R>(
  items: Array<T>,
  func: (item: T, index: number) => Promise<R>
): Promise<Array<R>> {
  const ar: Array<R> = [];
  await items.reduce((promise: Promise<R>, item: T, idx: number) => {
    // console.log(item)
    // console.log(idx)
    return promise.then(async () => {
      ar.push(await func(item, idx));
      return promise;
    });
  }, Promise.resolve({} as R));
  return ar;
}
