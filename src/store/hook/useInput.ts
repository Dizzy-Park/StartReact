import React, {
  useState,
  ChangeEventHandler,
  RefObject,
  KeyboardEventHandler,
} from "react";

/**
 * input 에 입력된 값 과 onChange 그리고 onKeyPress 가 설정되어있음
 * enter 키 입력시 이동시키기 위한 처리가 되어있음
 * value
 */
export interface IUseInput {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyPress: KeyboardEventHandler<HTMLInputElement>;
}

/**
 * keyboard event 중 enter 가 입력되면 passwordRef 로 이동
 * @param initalValue string 초기값 설정
 * @param target RefObject<T> Enter가 입력될시 input 이면 이동 button 이면 클릭할 타겟
 * @returns IUseInput
 */
function useInput<T extends HTMLElement>(
  initalValue: string,
  target?: RefObject<T>
): IUseInput {
  const [value, setValue] = useState(initalValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (
    e: React.KeyboardEvent
  ): void => {
    if (e.key === "Enter" && target) {
      switch (target.current?.nodeName) {
        case "BUTTON":
          target.current?.click();
          break;

        default:
          target.current?.focus();
      }
    }
  };
  return { value, onChange, onKeyPress };
}
export default useInput;
