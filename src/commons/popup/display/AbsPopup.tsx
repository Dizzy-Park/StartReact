import SVG from "commons/styles/svgIcon";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { AbsPopupType } from "../AbsPopupType";
import {
  useAbsPopupButton,
  useAbsPopupData,
  useAbsPopupTitle,
  useClosePopup,
} from "../store/absPopupHook";
import { ButtonState, type IButton } from "../store/absPopupVo";

const MsgWrapper = styled.div<{
  width: number | string;
  maxHeight?: number | string;
  borderShape?: number | string;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${props => {
    switch (typeof props.width) {
      case "number":
        return props.width + "px";
      case "string":
        return props.width;
    }
  }};
  min-height: 150px;
  ${props => {
    if (props.maxHeight) {
      switch (typeof props.maxHeight) {
        case "string":
          return css`
            max-height: ${props.maxHeight};
          `;
        case "number":
          return css`
            max-height: ${props.maxHeight + "px"};
          `;
      }
    }
  }}
  border-radius: ${props => {
    switch (typeof props.borderShape) {
      case "number":
        return props.borderShape + "px";
      case "string":
        return props.borderShape;
      default:
        return "15px";
    }
  }};
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  & .close {
    position: absolute;
    top: 15px;
    right: 25px;
    width: 25px;
    height: 25px;
    padding: 0;
    margin: 0;
    border: 0;
    background: url(${SVG.Closed("25282b")}) no-repeat center center;
    background-size: 16px;

    &:hover {
      opacity: 0.6;
    }
    &:before,
    &:after {
      margin: 0;
    }
  }
`;

const headerStyle = () => {
  return css`
    display: flex;
    position: relative;
    min-height: 55px;
    padding: 15px 25px;
    border-bottom: 1px solid ${props => props.theme.colors.borderPrimary};
    justify-content: center;
  `;
};

const MsgHeader = styled.div`
  ${headerStyle};
`;

const bodyStyle = css<{ maxHeight?: number | string }>`
  ${props =>
    props.maxHeight !== undefined
      ? css`
          overflow-y: auto;
        `
      : ``}

  display: flex;
  flex-direction: column;
  height: 100%;
  word-break: keep-all;

  strong {
    display: block;
    margin-bottom: 13px;
  }
`;

const MsgBody = styled.div<{
  type: AbsPopupType | string;
  device: boolean;
  maxHeight?: number | string;
  isButtonList?: boolean;
}>`
  ${bodyStyle};

  ${props => {
    switch (props.type) {
      case AbsPopupType.WARNING:
        return css`
          padding: 85px 40px 5px 40px;
          background: url("../../../images/icon/icon_error.png") no-repeat
            center 30px;
          background-size: 40px;
        `;
      case AbsPopupType.INPUT:
        return css`
          padding: 20px 26px;
        `;
      case AbsPopupType.ALERT:
      case AbsPopupType.CONFIRM:
        if (props.device) {
          return css`
            padding: 55px 40px 25px 40px;
          `;
        } else {
          return css`
            padding: 30px 20px 0 20px;
          `;
        }
      default:
        return css`
          padding: 16px;
        `;
    }
  }}
`;

const MsgFooter = styled.div<{ type: AbsPopupType | string; device: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => {
    if (props.device) {
      return css`
        padding: 25px 20px 25px;

        & > * {
          font-size: 1.143rem;
          line-height: 56px;
        }
      `;
    } else {
      return css`
        padding: 25px 20px 20px;

        & > * {
          font-size: 1rem;
          line-height: 46px;
        }
      `;
    }
  }}

  & > * {
    flex-grow: 1;
    margin-left: 4%;
    min-width: 48%;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;

function AbsPopupTitle(props: { type: AbsPopupType | string }) {
  const { title, isClose, close } = useAbsPopupTitle(props.type);
  return (
    <>
      {title !== undefined ? (
        <MsgHeader>
          <h3>{title}</h3>
        </MsgHeader>
      ) : (
        <></>
      )}
      {isClose && (
        <button
          className="close"
          onClick={close.bind(null, ButtonState.NO, undefined)}
        ></button>
      )}
    </>
  );
}

function AbsPopupButtonList(props: {
  type: AbsPopupType | string;
  device: boolean;
}) {
  const { buttonOption, Button, close } = useAbsPopupButton(props.type);

  return (
    <MsgFooter type={props.type} device={props.device}>
      {buttonOption?.map((item: IButton, idx: number) => {
        if (Button !== undefined) {
          return (
            <Button
              key={idx}
              {...item}
              btnType={item.state ? "normal" : "border"}
              isRadius
              onClick={close.bind(null, item?.state, undefined)}
            />
          );
        } else {
          return (
            <button
              key={idx}
              {...item}
              onClick={close.bind(null, item?.state, undefined)}
            >
              {item.text}
            </button>
          );
        }
      })}
    </MsgFooter>
  );
}

export interface IAbsPopupProps {
  type: AbsPopupType | string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  borderShape?: string | number;
  isButtonList?: boolean;
}

function AbsPopup(props: IAbsPopupProps) {
  const { width, ButtonWrapper, maxHeight, isDevice } = useAbsPopupData(
    props.type
  );
  const { close } = useClosePopup(props.type);
  const keyEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close(ButtonState.NO);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyEvent);
    return () => {
      window.removeEventListener("keydown", keyEvent);
    };
  });
  return (
    <>
      <MsgWrapper
        width={width ? width : 440}
        maxHeight={maxHeight ? maxHeight : undefined}
        borderShape={props.borderShape}
      >
        {props.header ? props.header : <AbsPopupTitle type={props.type} />}
        <MsgBody
          type={props.type}
          device={isDevice}
          maxHeight={maxHeight}
          isButtonList={props.isButtonList}
        >
          {props.children}
        </MsgBody>
        {props.isButtonList === true || props.isButtonList === undefined ? (
          <>
            {ButtonWrapper !== undefined ? (
              <ButtonWrapper />
            ) : (
              <AbsPopupButtonList type={props.type} device={isDevice} />
            )}
          </>
        ) : (
          <></>
        )}
      </MsgWrapper>
    </>
  );
}
export default React.memo(AbsPopup);
