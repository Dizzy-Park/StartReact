import React from "react";
import styled from "styled-components";
import { usePopupData } from "../store/absPopupHook";
import AbsPopup, { IAbsPopupProps } from "./AbsPopup";

const BodyContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1;
`;

const AlertOrConfirm: React.FC<IAbsPopupProps> = (props: IAbsPopupProps) => {
  const { popupDo } = usePopupData<string>(props.type);
  return (
    <>
      <AbsPopup type={popupDo.type}>
        <BodyContiner>
          {popupDo.data
            ?.replace(/<br(.*?)\/>/gims, `<br/>`)
            .split("<br/>")
            .map((line, idx) => {
              return (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              );
            })}
        </BodyContiner>
      </AbsPopup>
    </>
  );
};
export default AlertOrConfirm;
