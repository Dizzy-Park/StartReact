import React from "react";
import styled from "styled-components";
import usePopup from "../store/modules/popup/usePopup";
import popups from "./popup/PopupType";

const PopupArea = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000000;
  opacity: 0.4;
`;

const PopupContiner = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const Popup: React.FC = () => {
  const { isPopup, popupVo } = usePopup();
  if (popupVo) {
    const SpecificStory = popups[popupVo.type];
    return (
      <>
        {isPopup === false ? (
          ""
        ) : (
          <>
            <PopupArea>
              <PopupBack />
              <PopupContiner>
                <SpecificStory data={popupVo}></SpecificStory>
              </PopupContiner>
            </PopupArea>
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Popup;
