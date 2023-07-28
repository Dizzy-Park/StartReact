import ES from "../EditorSetting";
import { range } from "../EditorUtils";
import type { EditorType, ICommand, IRangeTarget } from "../EditorVo";

export default class Align implements ICommand {
  constructor(
    private readonly data: { readonly type: EditorType; value: string | null }
  ) {
    this.data = { type: data.type, value: data.value };
  }

  private toItalic(): void {
    const rn: IRangeTarget = ES.getRangeTarget(range());
    const p = rn.end;
    let t = rn.start;
    switch (this.data.type) {
      case "text":
        while (t !== null) {
          if (
            t.nodeName.toLocaleLowerCase() === ES.ENTER.toLocaleLowerCase() &&
            this.data.value !== null
          ) {
            (t as HTMLParagraphElement).align = this.data.value;
          }
          t = t !== p ? (t.nextSibling as Element | null) : null;
        }
        break;
      case "block":
        while (t !== null) {
          if (t.nodeName.toLocaleLowerCase() === ES.BLOCK.toLocaleLowerCase()) {
            t.classList.remove("left", "rignt", "center", "justify");
            t.classList.add(this.data.value!);
          }
          t = t !== p ? (t.nextSibling as Element | null) : null;
        }
        break;
      case "index":
        while (t !== null) {
          if (t.classList.contains(ES.toINDEX)) {
            t.classList.remove("left", "rignt", "center", "justify");
            t.classList.add(this.data.value!);
          }
          t = t !== p ? (t.nextSibling as Element | null) : null;
        }
        break;
    }
  }

  public execute() {
    this.toItalic();
  }
}
