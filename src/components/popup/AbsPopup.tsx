import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import usePopup from "../../store/modules/popup/usePopup";
import { IButton, IPopup } from "../../store/modules/popup/popupR";

const Popup = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width}px;
  min-height: 150px;
  padding: 20px 20px 20px 20px;
  border-radius: 4px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

const TitleContiner = styled.div`
  display: flex;
  flex-direction: row;
`;

const CloseBox = styled(Button)`
  margin-left: auto;
  min-width: 20px;
  height: 20px;
`;

const BodyContiner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ButtonContiner = styled(TitleContiner)`
  justify-content: space-evenly;
  margin-top: auto;
  padding-top: 20px;
`;

export interface IAbsPopupProps<T> {
  data: IPopup<T>;
  onClick?: () => Promise<void>;
  children?: React.ReactNode;
}

function AbsPopup<T>(props: IAbsPopupProps<T>): JSX.Element {
  const { close } = usePopup();
  const closeHandler = () => {
    close();
  };
  const buttonClickHandler = (item: IButton) => {
    if (props.data.onResult) {
      props.data.onResult(item);
    }
    close();
  };
  return (
    <>
      <Popup width={props.data.width ? props.data.width : 300}>
        <TitleContiner>
          <span>{props.data.title}</span>
          {props.data.isClose ? (
            <CloseBox size="small" onClick={closeHandler}>
              X
            </CloseBox>
          ) : (
            ""
          )}
        </TitleContiner>
        <BodyContiner>{props.children}</BodyContiner>
        <ButtonContiner>
          {props.data.buttons?.map((item, idx) => {
            return (
              <Button
                key={idx}
                color={item.color}
                variant={item.variant}
                size={item.size}
                onClick={buttonClickHandler.bind(null, item)}
              >
                {item.text}
              </Button>
            );
          })}
        </ButtonContiner>
      </Popup>
    </>
  );
}
export default AbsPopup;
