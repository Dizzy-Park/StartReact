import type { ICommand } from "../EditorVo";

export class EditorAction {
  private action: ICommand | null = null;
  private history: Array<ICommand> = [];

  private setHistory(data: ICommand) {
    this.history.push(data);
  }

  private buttonPress() {
    this.action?.execute();
  }

  setCommand(command: ICommand) {
    this.action = command;
    this.setHistory(command);
    this.buttonPress();
  }
}
