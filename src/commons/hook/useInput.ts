import { useState, type ChangeEventHandler } from "react";
import type { IUseInput, IUseParam } from "./hookVo";

/**
 * change 이벤트 발생과
 * enter 입력시 next 이벤트 발생 후 target 존재시 target로 포커스 이동 처리
 * focusout 시 focusout 발생 하게 처리된 훅
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
  onNextHandler = undefined,
  onFocusOut = undefined,
}: IUseParam<T>): IUseInput {
  const [value, setValue] = useState(initalValue);
  const [checked, setChecked] = useState(initalChecked);

  let onChange: ChangeEventHandler<HTMLInputElement>;

  // 타입에 따른 useInput return 값
  switch (type) {
    case "text":
    case "number":
    case "search":
    case "email":
    case "tel":
    case "password": {
      onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
        const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
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
          type,
          onChange,
          onKeyPress,
          onBlur,
          setValue,
        };
      } else {
        return { value, placeholder, type, onChange, onKeyPress, setValue };
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
            type: "change",
            setChecked: setChecked,
          });
        }
      };
      return { checked, type, onChange, setChecked, setValue };
    case "file":
      onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {
          target: { files },
        } = e;

        if (onChangeHandler) {
          if (files) {
            onChangeHandler({ file: files[0], type: "change" });
          }
        }
      };
      return { checked, type, onChange, setChecked, setValue };
    default:
      onChange = (): void => {
        if (onChangeHandler) {
          onChangeHandler({ type: "change" });
        }
      };
      return { setValue };
  }
}
export default useInput;
