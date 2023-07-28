import { range, resetRange } from "../EditorUtils";
import type { EditorType, ICommand } from "../EditorVo";

export default class Link implements ICommand {
  constructor(
    private readonly data: { readonly type: EditorType; value: string | null }
  ) {
    this.data = { type: data.type, value: data.value };
  }

  private defaultCommand(
    focus: Range | null,
    cmd: string,
    value?: string | null
  ) {
    resetRange(focus);
    document.execCommand("styleWithCSS", false, undefined);
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand("removeFormat", false, cmd);
    }
  }

  private toLink(): void {
    if (this.data.value === null || this.data.value === "") {
      // const t = closest(range()?.startContainer, "a");
      // resetRange(t?.firstChild, 0, t?.lastChild, t?.lastChild?.length);
      document.execCommand("unlink", false);
    } else {
      if (
        this.data.value.indexOf("http://") === -1 &&
        this.data.value.indexOf("https://") === -1
      ) {
        this.data.value = "http://" + this.data.value;
      }
      const selection = document.getSelection();
      this.defaultCommand(range(), "link", this.data.value);
      if (
        selection !== null &&
        selection.anchorNode !== null &&
        selection.anchorNode.parentElement !== null
      ) {
        (selection.anchorNode.parentElement as HTMLAnchorElement).target =
          "_blank";
      }
    }
  }

  execute() {
    this.toLink();
  }
}
