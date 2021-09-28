import React, {
  useState,
  ChangeEventHandler,
  RefObject,
  KeyboardEventHandler,
  FocusEventHandler,
} from "react";

/**
 * input 에 입력된 값 과 onChange 그리고 onKeyPress 가 설정되어있음
 * enter 키 입력시 이동시키기 위한 처리가 되어있음
 * value
 */
export interface IUseInput {
  id?: string;
  value?: string;
  checked?: boolean;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUseChangeParam {
  key?: number;
  value?: string;
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

export interface IUseParam<T extends HTMLElement> {
  id?: string;
  key?: number;
  initalValue?: string;
  initalChecked?: boolean;
  placeholder?: string;
  type?: string;
  target?: RefObject<T>;
  onChangeHandler?: (value: IUseChangeParam) => Promise<void>;
  onFocusOut?: (value: string) => Promise<void>;
  next?: (value: string) => Promise<void>;
}

/**
 * keyboard event 중 enter 가 입력되면 passwordRef 로 이동
 * @param initalValue string 초기값 설정
 * @param target RefObject<T> Enter가 입력될시 input 이면 이동 button 이면 클릭할 타겟
 * @param placeholder 기본 가이드 텍스트
 * @returns IUseInput
 */
function useInput<T extends HTMLElement>({
  id = "",
  key = -1,
  initalValue = "",
  initalChecked = false,
  placeholder = "",
  type = "text",
  target = undefined,
  onChangeHandler = undefined,
  onFocusOut = undefined,
  next = undefined,
}: IUseParam<T>): IUseInput {
  const [value, setValue] = useState(initalValue);
  const [checked, setChecked] = useState(initalChecked);

  let onChange: ChangeEventHandler<HTMLInputElement>;
  switch (type) {
    case "text": {
      onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {
          target: { value },
        } = e;
        setValue(value);
        if (onChangeHandler) {
          onChangeHandler({ key: key, value: value, setValue: setValue });
        }
      };
      const onKeyPress = (e: React.KeyboardEvent): void => {
        if (e.key === "Enter" && target) {
          if (next !== undefined) {
            next(id);
          } else {
            target?.current?.focus();
          }
        }
      };
      if (id !== "" && onFocusOut !== undefined) {
        const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
          const {
            target: { value },
          } = e;

          console.log(value);
          onFocusOut(id);
        };
        return { value, placeholder, type, onChange, onKeyPress, onBlur };
      } else {
        return { value, placeholder, type, onChange, onKeyPress };
      }
    }
    case "checkbox":
      onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {
          target: { checked },
        } = e;
        setChecked(checked);
        if (onChangeHandler) {
          onChangeHandler({
            key: key,
            checked: checked,
            setChecked: setChecked,
          });
        }
      };
      return { checked, type, onChange, setChecked };
    default:
      onChange = (): void => {
        if (onChangeHandler) {
          onChangeHandler({});
        }
      };
      return {};
  }
}
export default useInput;

export interface IUseInputRef<T extends HTMLElement> extends IUseInput {
  inputRef?: RefObject<T>;
}

export interface IUserParamRef<T extends HTMLElement, Z extends HTMLElement>
  extends IUseParam<T> {
  inputRef?: RefObject<Z>;
}

export function useInputRef<T extends HTMLElement, Z extends HTMLElement>({
  id = "",
  initalValue = "",
  placeholder = "",
  type = undefined,
  inputRef = undefined,
  target = undefined,
  onFocusOut = undefined,
  next = undefined,
}: IUserParamRef<T, Z>): IUseInputRef<Z> {
  const [value, setValue] = useState(initalValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = async (
    e: React.KeyboardEvent
  ): Promise<void> => {
    if (e.key === "Enter" && target) {
      if (next !== undefined) {
        next(id);
      } else {
        target?.current?.focus();
      }
    }
  };
  if (id !== "" && onFocusOut) {
    const onBlur: FocusEventHandler<HTMLInputElement> = async (
      e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        target: { value },
      } = e;
      onFocusOut(id);
    };
    return {
      id,
      value,
      placeholder,
      type,
      inputRef,
      onChange,
      onKeyPress,
      onBlur,
    };
  } else {
    return {
      id,
      value,
      placeholder,
      type,
      inputRef,
      onChange,
      onKeyPress,
    };
  }
}

export const emailRule =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식
export const passwordRule =
  /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; //비밀번호: 8~32자리,영문,특수문자
