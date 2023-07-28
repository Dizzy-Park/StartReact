import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useCheckBox } from "commons/ui/useUihook";
import type { IValid } from "commons/ui/useValid";

const CheckSvg = (color: string): string => {
  color = color.indexOf("#") === -1 ? color : color.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Crect width='14.5' height='14.5' x='.75' y='.75' fill='%23ffffff' stroke='%23${color}' stroke-width='1.5' rx='1.25'/%3E%3C/svg%3E"`;
};

const CheckdSvg = (color: string): string => {
  color = color.indexOf("#") === -1 ? color : color.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23${color}' rx='2'/%3E%3Cpath fill='%23ffffff' d='M6.167 12.683L2 8.517l1.175-1.175 2.992 2.983L12.492 4l1.175 1.183-7.5 7.5z'/%3E%3C/svg%3E"`;
};

const InputCheckBoxItem = styled.label<{
  onlyBox?: boolean;
}>`
  display: block;
  margin-right: 10px;
  padding: 3px 0;
  line-height: 1;

  i {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    margin-top: -2px;
    background-size: 16px;
    background-position: center center;
    background-repeat: no-repeat;

    ${props =>
      `background-image: url(${CheckSvg(props.theme.colors.borderPrimary)})`};
    vertical-align: middle;
  }

  &:hover {
    input + i {
      ${props =>
        `background-image: url(${CheckSvg(props.theme.colors.borderHover)})`};
    }
    input:checked + i {
      ${props =>
        `background-image: url(${CheckdSvg(props.theme.colors.borderFocus)})`};
    }
  }
  input {
    display: none;
    &:checked + i {
      ${props =>
        `background-image: url(${CheckdSvg(props.theme.colors.borderFocus)})`};
    }
    &:disabled + i {
      ${props =>
        `background-image: url(${CheckSvg(props.theme.colors.borderPrimary)})`};
    }
    &:checked:disabled + i {
      ${props =>
        `background-image: url(${CheckdSvg(
          props.theme.colors.borderPrimary
        )})`};
    }
  }

  ${props => {
    if (props.onlyBox) {
      return css`
        & {
          display: inline-block;
          padding: 0;
          margin: 0;
          font-size: 0;

          i {
            margin-right: 0;
          }
        }
      `;
    }
  }};
`;

interface ICheckBoxProps {
  name: string;
  id?: string;
  text?: string;
  onlyBox?: boolean;
  value?: boolean;
  change?: (value: boolean, id?: string) => void;
  disabled?: boolean;
}

function CheckBox(props: ICheckBoxProps) {
  const [value, setValue] = useState<boolean>(props.value ? true : false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValue(checked);
    if (props.change) {
      props.change(checked, props.id);
    }
  };
  useEffect(() => {
    setValue(props.value ? true : false);
  }, [props.value]);
  return (
    <InputCheckBoxItem onlyBox={props.onlyBox}>
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={value}
        onChange={onChange}
        disabled={props.disabled}
      />
      <i />
      {props.text ? props.text : ""}
    </InputCheckBoxItem>
  );
}

export default React.memo(CheckBox);

type IUiCheckBoxProps = Omit<ICheckBoxProps, "id"> & {
  id: string;
  isAll?: boolean;
  valid?: IValid<boolean | undefined>;
  init?: boolean;
  change?: (value?: boolean) => void;
};

export function UiCheckBox(props: IUiCheckBoxProps) {
  const { checkValue, changeValue } = useCheckBox(
    props.name,
    props.id,
    props.valid,
    props.init,
    props.change
  );
  return (
    <CheckBox
      name={props.name}
      change={changeValue}
      value={checkValue}
      text={props.text}
    />
  );
}
