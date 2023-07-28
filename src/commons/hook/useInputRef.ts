import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type FocusEventHandler,
} from "react";
import type { IUseInputRef, IUserParamRef } from "./hookVo";

/**
 * change 이벤트 발생과
 * enter 입력시 next 이벤트 발생 후 target 존재시 target로 포커스 이동 처리
 * focusout 시 focusout 발생 하게 처리된 훅
 * ref 리턴해주는 형태로 접근이 가능하게 처리되는 훅
 * @param initalValue string 초기값 설정
 * @param target RefObject<T> Enter가 입력될시 input 이면 이동 button 이면 클릭할 타겟
 * @param placeholder 기본 가이드 텍스트
 * @returns IUseInput
 */
export default function useInputRef<
  T extends HTMLElement,
  Z extends HTMLElement
>({
  id = "",
  key = -1,
  initalValue = "",
  placeholder = "",
  type = undefined,
  inputRef = undefined,
  target = undefined,
  onFocusOut = undefined,
  onChangeHandler = undefined,
  onNextHandler = undefined,
}: IUserParamRef<T, Z>): IUseInputRef<Z> {
  const [value, setValue] = useState(initalValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
    if (onChangeHandler) {
      onChangeHandler({
        id: id,
        key: key,
        value: value,
        type: "change",
        setValue: setValue,
      });
    }
  };
  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = async (
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
