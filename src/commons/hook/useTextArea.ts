import { useState, type ChangeEventHandler } from "react";
import type { IUseParam, IUseTextArea } from "./hookVo";

/**
 * keyboard event 중 enter 가 입력되면 passwordRef 로 이동
 * @param initalValue string 초기값 설정
 * @param target RefObject<T> Enter가 입력될시 TextArea 이면 이동 button 이면 클릭할 타겟
 * @param placeholder 기본 가이드 텍스트
 * @returns IUseTextArea
 */
function useTextArea<T extends HTMLElement>({
  id = "",
  key = -1,
  initalValue = "",
  placeholder = "",
  target = undefined,
  onChangeHandler = undefined,
  onNextHandler = undefined,
  onFocusOut = undefined,
}: IUseParam<T>): IUseTextArea {
  const [value, setValue] = useState(initalValue);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
    if (onChangeHandler) {
      onChangeHandler({
        id: id,
        key: key,
        type: "change",
        value: value,
        setValue: setValue,
      });
    }
  };
  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
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
  if (id !== "" && onFocusOut !== undefined) {
    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
      const {
        target: { value },
      } = e;
      onFocusOut({
        id: id,
        key: key,
        value: value,
        type: "focusOut",
        setValue: setValue,
      });
    };
    return {
      value,
      placeholder,
      onChange,
      onKeyPress,
      onBlur,
      setValue,
    };
  } else {
    return { value, placeholder, onChange, onKeyPress, setValue };
  }
}

export default useTextArea;
