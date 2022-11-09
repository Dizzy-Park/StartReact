import React, { Suspense } from "react";
import styled, { StyledComponent } from "styled-components";
import usePopup from "./store/absPopupHook";
import { getPopup } from "./AbsPopupType";
import Spinner from "../loading/display/Spinner";

export const PopupArea = styled.section`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const PopupStyle = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PopupBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.4;
`;

const PopupContiner = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

/**
 * 팝업 영역 커스텀을 위해 제작됨
 */
interface IPopupProps {
  /**
   * 영역 스타일 컴포넌트 전달
   * ex) const popupArea = styled(PopupArea)`
   *   position: fixed;
   *   width: 500px;
   * `
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  area?: StyledComponent<"section", any>;
}

function Popup(props: IPopupProps) {
  const { isPopup, popupDo } = usePopup();
  const Area = props.area ? props.area : PopupArea;
  if (popupDo.length > 0) {
    return (
      <Area>
        {isPopup === false ? (
          ""
        ) : (
          <>
            {popupDo.map((popup, idx) => {
              const SpecificStory = getPopup(popup.type);
              return (
                <PopupStyle key={`${popup.type}_${idx}`}>
                  <PopupBack />
                  <PopupContiner>
                    <Suspense fallback={<Spinner text="로딩중입니다." />}>
                      <SpecificStory type={popup.type} data={popup} />
                    </Suspense>
                  </PopupContiner>
                </PopupStyle>
              );
            })}
          </>
        )}
      </Area>
    );
  } else {
    return <></>;
  }
}

export default Popup;
