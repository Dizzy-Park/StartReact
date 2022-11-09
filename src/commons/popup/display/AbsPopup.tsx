import { ButtonType } from "components/ComponentsType";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { AbsPopupType } from "../AbsPopupType";
import {
  useAbsPopupButton,
  useAbsPopupData,
  useAbsPopupTitle,
} from "../store/absPopupHook";
import { ButtonState, IButton } from "../store/absPopupVo";

const defaultColor = "#3E3E40";

const CloseIcon = (color?: string): string => {
  if (!color) color = defaultColor;
  color =
    color?.indexOf("#") === -1 ? color : color?.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' viewBox='0 0 15 15'%3E%3Cpath stroke='%23${color}' stroke-linecap='round' stroke-linejoin='round' d='M14.5.5l-14 14M.5.5l14 14'/%3E%3C/svg%3E"`;
};

const MsgWrapper = styled.div<{ width: number | string }>`
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
  border-radius: 15px;
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
    background: url(${CloseIcon("323232")}) no-repeat center center;

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
    border-bottom: 1px solid ${props => props.theme.colors.borderGrey};
    justify-content: center;
  `;
};

const MsgHeader = styled.div`
  ${headerStyle};
`;

const bodyStyle = () => {
  return css`
    display: flex;
    flex-direction: column;
    word-break: keep-all;

    strong {
      display: block;
      margin-bottom: 13px;
    }
  `;
};
const MobileMessagBody = css<{ device: boolean }>`
  ${props => {
    if (props.device) {
      return css`
        padding: 55px 40px 25px 40px;
      `;
    } else {
      return css`
        padding: 30px 20px 0 20px;
      `;
    }
  }}
`;

const MsgBody = styled.div<{
  type: AbsPopupType | string;
  maxHeight?: number;
  device: boolean;
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
        return css`
          ${MobileMessagBody}
        `;
      default:
        return css`
          padding: 20px;
        `;
    }
  }}

  ${props => {
    if (props.maxHeight) {
      return css`
        max-height: ${props.maxHeight + "px"};
        overflow-y: auto;
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
              btnType={item.state ? ButtonType.NORMAL : ButtonType.BORDER}
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
  children?: React.ReactNode;
}

function AbsPopup(props: IAbsPopupProps) {
  const { width, ButtonWrapper, maxHeight, device } = useAbsPopupData(
    props.type
  );
  return (
    <>
      <MsgWrapper width={width ? width : 440}>
        <AbsPopupTitle type={props.type} />
        <MsgBody
          type={props.type}
          device={device === "pc"}
          maxHeight={maxHeight ? maxHeight : undefined}
        >
          {props.children}
        </MsgBody>
        {ButtonWrapper !== undefined ? (
          <ButtonWrapper />
        ) : (
          <AbsPopupButtonList type={props.type} device={device === "pc"} />
        )}
      </MsgWrapper>
    </>
  );
}
export default React.memo(AbsPopup);
