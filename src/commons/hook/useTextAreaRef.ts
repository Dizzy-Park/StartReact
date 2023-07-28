import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type FocusEventHandler,
} from "react";
import type { IUseTextAreaRef, IUserParamRef } from "./hookVo";

export default function useTextAreaRef<
  T extends HTMLElement,
  Z extends HTMLElement
>({
  id = "",
  key = -1,
  initalValue = "",
  placeholder = "",
  TextAreaRef = undefined,
  target = undefined,
  onFocusOut = undefined,
  onNextHandler = undefined,
}: IUserParamRef<T, Z>): IUseTextAreaRef<Z> {
  const [value, setValue] = useState(initalValue);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  const onKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = async (
    e: React.KeyboardEvent
  ): Promise<void> => {
    if (e.key === "Enter" && target) {
      if (onNextHandler) {
        onNextHandler({
          id: id,
          key: key,
          value: value,
          type: "next",
          setValue: setValue,
        });
      }
      if (target) {
        target?.current?.focus();
      }
    }
  };
  if (id !== "" && onFocusOut) {
    const onBlur: FocusEventHandler<HTMLTextAreaElement> = async (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ): Promise<void> => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        target: { value },
      } = e;
      onFocusOut({
        id: id,
        value: value,
        type: "focusOut",
        setValue: setValue,
      });
    };
    return {
      id,
      value,
      placeholder,
      TextAreaRef,
      onChange,
      onKeyPress,
      onBlur,
    };
  } else {
    return {
      id,
      value,
      placeholder,
      TextAreaRef,
      onChange,
      onKeyPress,
    };
  }
}
