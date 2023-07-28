import React from "react";
import styled from "styled-components";
import { usePopupData } from "../store/absPopupHook";
import AbsPopup, { type IAbsPopupProps } from "./AbsPopup";

const BodyContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1;

  .title {
    text-align: left;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .sub-title {
    text-align: left;
  }
`;

function AlertOrConfirm(props: IAbsPopupProps) {
  const { popupDo } = usePopupData<
    string | { message: string; title?: string; subMessage?: string }
  >(props.type);

  return (
    <>
      <AbsPopup type={popupDo.type}>
        <BodyContiner>
          {typeof popupDo.data === "string"
            ? popupDo.data
                ?.replace(/<br(.*?)\/>/gims, `<br/>`)
                .split("<br/>")
                .map((line, idx) => {
                  return (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  );
                })
            : popupDo.data?.message
                .replace(/<br(.*?)\/>/gims, `<br/>`)
                .split("<br/>")
                .map((line, idx) => {
                  return (
                    <span
                      key={idx}
                      className={
                        typeof popupDo.data !== "string" &&
                        popupDo.data?.subMessage !== undefined
                          ? "title"
                          : ""
                      }
                    >
                      {line}
                      <br />
                    </span>
                  );
                })}

          {typeof popupDo.data !== "string" &&
            popupDo.data?.subMessage !== undefined && (
              <p className="sub-title">{popupDo.data?.subMessage}</p>
            )}
        </BodyContiner>
      </AbsPopup>
    </>
  );
}
export default AlertOrConfirm;
