import { range } from "../EditorUtils";
import type { EditorType, ICommand } from "../EditorVo";

export default class Italic implements ICommand {
  constructor(
    private readonly data: { readonly type: EditorType; value: string | null }
  ) {
    this.data = { type: data.type, value: data.value };
  }

  private toItalic(): void {
    switch (this.data.type) {
      case "text":
        if (range()) {
          document.execCommand(
            "italic",
            false,
            this.data.value === null ? undefined : this.data.value
          );
        }
        break;
      default:
        break;
    }
  }

  public execute() {
    this.toItalic();
  }
}
