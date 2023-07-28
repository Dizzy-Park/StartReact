import { type IValid, useValid } from "commons/ui/useValid";
import React from "react";
import type { IUseInputEventParam } from "commons/hook/hookVo";
import type { IInputProps } from "../InputText";
import InputText from "../InputText";

export interface IInputValidProps extends IInputProps {
  autocomplete?: string;
  valid?: IValid<string>;
  checkValid?: (value: boolean) => void;
}

export default function ValidInputText(props: IInputValidProps): JSX.Element {
  const { validValue, changeValue } = useValid(
    props.id ? props.id : `InputText${Math.random()}`,
    props.valid,
    (value?: string) => {
      if (props.change) {
        props.change({ type: "change", value: value!, id: props.id });
      }
      if (props.checkValid) {
        props.checkValid(validValue!);
      }
    },
    props.value
  );
  const onChange = (e: IUseInputEventParam) => {
    changeValue(e.value as string, e.id);
    if (props.change) {
      props.change(e);
    }
    if (props.next && e.type === "next") {
      props.next(e);
    }
  };
  return (
    <InputText
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      target={props.target}
      refTarget={props.refTarget}
      inputSize={props.inputSize}
      disabled={props.disabled}
      readOnly={props.readOnly}
      maxLength={props.maxLength}
      className={props.className}
      change={onChange}
      value={props.value}
    />
  );
}
