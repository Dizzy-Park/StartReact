import type { EditorType, ICommand } from "../EditorVo";

export default class UnderLine implements ICommand {
  constructor(
    private readonly data: { readonly type: EditorType; value: string | null }
  ) {
    this.data = { type: data.type, value: data.value };
  }

  private toUnderLine() {
    console.log(this.data.type, this.data.value);
  }
  execute() {
    this.toUnderLine();
  }
}
