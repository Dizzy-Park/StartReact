import ES from "../EditorSetting";
import { closest, range, resetRange } from "../EditorUtils";
import type { EditorType, ICommand } from "../EditorVo";

export default class Bold implements ICommand {
  constructor(
    private readonly data: { readonly type: EditorType; value: string | null }
  ) {
    this.data = { type: data.type, value: data.value };
  }

  private toBold(): void {
    let t = document.querySelector(ES.SELECT);
    switch (this.data.type) {
      case "text":
        if (range()) {
          document.execCommand(
            "bold",
            false,
            this.data.value === null ? undefined : this.data.value
          );
        }
        break;
      case "block":
        t = closest(range().startContainer, ES.BLOCK);
        resetRange(t);
        break;
    }
  }

  execute() {
    this.toBold();
  }
}
