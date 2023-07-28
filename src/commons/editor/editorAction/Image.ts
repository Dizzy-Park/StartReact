import ES from "../EditorSetting";
import {
  createElement,
  createFileInput,
  createImg,
  range,
  resetRange,
} from "../EditorUtils";
import type { EditorType, ICommand } from "../EditorVo";

interface IFileData {
  filename: string;
  filetype?: string;
  imageData?: string;
  file?: File;
}
export default class EditorImage implements ICommand {
  constructor(
    private readonly data: { readonly type: EditorType; value: string | null }
  ) {
    this.data = { type: data.type, value: data.value };
  }

  private isParagraph(n: Node | null) {
    if (n?.nextSibling === null) {
      const temp = document.createElement(ES.ENTER) as HTMLParagraphElement;
      temp.align = "left";
      temp.appendChild(document.createElement("br"));
      if (n.parentNode !== null) {
        n.parentNode.appendChild(temp);
      }
    }
  }

  private getFileType = (file: File): Promise<IFileData> => {
    return new Promise(res => {
      const fileType = file.type.split("/").pop();
      switch (fileType) {
        case "gif":
          {
            const reader = new FileReader();
            reader.onload = e => {
              res({
                filename: file.name,
                filetype: fileType,
                imageData: e.target?.result as string,
              } as IFileData);
            };
            reader.readAsDataURL(file);
          }
          break;
        case "jpg":
        case "png":
        case "jpeg":
          {
            const image = new Image();
            const canvas = document.createElement("canvas");
            image.src = URL.createObjectURL(file);
            image.onload = () => {
              canvas.width = image.width;
              canvas.height = image.height;
              canvas
                .getContext("2d")
                ?.drawImage(image, 0, 0, image.width, image.height);
              const dataURL = canvas.toDataURL(file.type, 1);
              res({
                filename: file.name,
                filetype: fileType,
                imageData: dataURL,
              } as IFileData);
            };
          }
          break;
        default:
          {
            res({
              filename: file.name,
              filetype: fileType,
              file: file,
            });
          }
          break;
      }
    });
  };

  private insertImage(): void {
    if (range()) {
      resetRange(range());
    }
    if (this.data.value) {
      const h = createElement(
        "figure",
        ["u_tag", "img", ES.toSELECT],
        createImg(this.data.value, ["fullImage"], Date.now())
      );
      h.appendChild(createElement("figcaption"));
      document.execCommand("insertHTML", false, h.outerHTML);

      const oh = document.querySelector(ES.SELECT);
      this.isParagraph(oh);
      resetRange(oh?.querySelector("img"));

      const inputFile = document.querySelector<HTMLInputElement>("#img_editor");

      inputFile?.parentNode?.appendChild(createElement("br"));
      inputFile?.remove();
    } else {
      const inputFile = document.querySelector<HTMLInputElement>("#img_editor");
      if (!inputFile) {
        const h = createFileInput([".jpg", ".jpeg", ".gif", ".png"]);
        document.execCommand("insertHTML", false, h.outerHTML);
        this.execute();
      } else {
        inputFile.click();
        inputFile.onchange = async () => {
          const files = inputFile.files!;
          const dump: Array<Promise<IFileData>> = [];
          for (let i = 0; i < files.length; i++) {
            dump.push(this.getFileType(files.item(i)!));
          }
          const temp = await Promise.all(dump);
          //TODO: 멀티지원하는경우 command 처리방식 수정
          if (temp.length > 0) {
            this.data.value = temp[0].imageData!;
            this.execute();
          }
        };
      }
    }
  }

  public execute() {
    this.insertImage();
  }
}
