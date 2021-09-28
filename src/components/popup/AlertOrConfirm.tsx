import React from "react";
import styled from "styled-components";
import AbsPopup, { IAbsPopupProps } from "./AbsPopup";

const BodyContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1;
`;

const AlertOrConfirm: React.FC<IAbsPopupProps<string>> = (
  props: IAbsPopupProps<string>
) => {
  return (
    <>
      <AbsPopup data={props.data}>
        <BodyContiner>{props.data.data}</BodyContiner>
      </AbsPopup>
    </>
  );
};
export default AlertOrConfirm;
