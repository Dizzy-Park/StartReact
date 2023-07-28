"use client";

import type {
  IUseInputEventParam,
  IUseInput,
  InputType,
} from "commons/hook/hookVo";
import useInput from "commons/hook/useInput";
import React, {
  type RefObject,
  useEffect,
  useState,
  type WheelEvent,
} from "react";
import styled, { css } from "styled-components";

/**
 * 기본 input 스타일 적용
 */
export const Input = styled.input<{ inputSize?: string; hidden?: boolean }>`
  ${props => {
    switch (props.type) {
      case "text":
      case "number":
      case "search":
      case "password":
      case "file":
      case "email":
      case "tel":
        return css`
          ${props.hidden &&
          css`
            display: none;
          `}
          width: ${props.inputSize ? props.inputSize : "240px"};
          height: 36px;
          padding: 8px 10px;
          border: 1px solid var(--border-primary);
          border-radius: 4px;
          color: var(--font-primary);
          font-weight: 400;
          font-size: ${props => props.theme.fontSize.default};
          -webkit-box-sizing: border-box;
          box-sizing: border-box;

          &:focus {
            border-color: var(--border-focus);
          }

          &:-moz-read-only {
            border-color: var(--primary);
            background-color: var(--bg-form);
            color: var(--font-primary);
          }
          &:read-only,
          &:disabled,
          &.is-disabled {
            border-color: var(--border-hover);
            background-color: var(--bg-table-head);
            color: var(--font-disabled);
            cursor: not-allowed;
          }
        `;
      default:
        return ``;
    }
  }}
`;

export type IInputTextEventParam = IUseInputEventParam;
/** next 이벤트 발생시 실행될 핸들러 */
export type InputTextNextHandler = (e: IInputTextEventParam) => void;
/** change 이벤트 발생시 실행될 핸들러 */
export type InputTextChangeHandler = (e: IInputTextEventParam) => void;

/**
 * InputText 기본 컴포넌트 옵션
 */
export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 고유값 */
  id?: string;
  /** 텍스트 값 */
  value?: string;
  /** 가이드 텍스트 */
  placeholder?: string;
  /** 인풋 타입 */
  type?: InputType;
  /** px % 단위 입력 */
  inputSize?: string;
  /** 숨김 여부 */
  hidden?: boolean;
  target?: RefObject<HTMLInputElement>;
  refTarget?: RefObject<HTMLInputElement>;
  /** 가격 표시 여부 */
  isPrice?: boolean;
  change?: InputTextChangeHandler;
  next?: InputTextNextHandler;
}

/**
 * Input 를 최적화 하여 300ms 딜레이로 change 이벤트가 발생되게 제작된 컴포넌트
 * enter 키가 입력되면 change 와 next 이벤트가 즉시 발생되게 되어있다.
 * @param props
 * @returns
 */
function InputText(props: IInputProps): JSX.Element {
  const [prev, setPrev] = useState<NodeJS.Timeout>();

  const test = (value?: string) => {
    if (value) {
      return props.isPrice
        ? Number(value.replaceAll(",", "")).toLocaleString().toString()
        : value;
    } else {
      return "";
    }
  };

  const stepChangeHandler = (value: IUseInputEventParam) => {
    if (prev !== undefined) {
      clearTimeout(prev);
    }
    if (value.type === "next") {
      if (props.change) {
        props.change(value);
      }
      if (props.next) {
        props.next(value);
      }
    } else {
      if (typeof window !== "undefined") {
        const st = setTimeout(() => {
          if (props.change) {
            if (props.isPrice !== undefined && props.isPrice) {
              props.change({
                ...value,
                value: (value.value as string).replaceAll(",", ""),
              });
            } else {
              props.change(value);
            }
          }
          setPrev(undefined);
        }, 300);
        setPrev(st);
      }
    }
  };
  const inputobj: IUseInput = useInput<HTMLInputElement>({
    id: props.id,
    type: props.type,
    placeholder: props.placeholder,
    initalValue: props.value,
    target: props.target,
    onChangeHandler: stepChangeHandler,
    onNextHandler: stepChangeHandler,
  });

  useEffect(() => {
    if (test(props.value) !== test(inputobj.value)) {
      if (inputobj.setValue) {
        inputobj.setValue(props.value as string);
      }
    }
  }, [props.value]);

  return (
    <Input
      ref={props.refTarget}
      disabled={props.disabled}
      id={inputobj.id ? inputobj.id : props.id}
      type={inputobj.type}
      placeholder={inputobj.placeholder}
      value={inputobj.value ? test(inputobj.value) : inputobj.value}
      onChange={inputobj.onChange}
      onBlur={inputobj.onBlur}
      className={props.className}
      onKeyPress={inputobj.onKeyPress}
      readOnly={props.readOnly}
      inputSize={props.inputSize}
      maxLength={props.maxLength}
      hidden={props.hidden}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onWheel={(e: WheelEvent<HTMLElement>) => e.currentTarget.blur()}
    />
  );
}
export default React.memo(InputText);
