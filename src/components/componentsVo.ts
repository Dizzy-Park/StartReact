import { ButtonColorType, ButtonSizeType, ButtonType } from "./ComponentsType";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  device?: boolean;
  text?: string;
  btnType?: ButtonType;
  btnColor?: ButtonColorType;
  btnSize?: ButtonSizeType;
  isRadius?: boolean;
  isBlock?: boolean;
  disabled?: boolean;
  className?: string;
  width?: number;
  onClick?: () => void;
  children?: React.ReactNode | React.ReactNode[];
  debounce?: boolean;
}
