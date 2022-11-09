import React, { Suspense } from "react";
import styled from "styled-components";
import useLayer from "./store/layerHook";
import layers from "./AbsLayerType";
import Spinner from "../loading/display/Spinner";

const LayerArea = styled.section`
  position: absolute;
  z-index: 9999;
`;

function Layer() {
  const { isLayer, data } = useLayer();
  if (data) {
    const SpecificStory = layers[data.type];
    return (
      <>
        {isLayer === false ? (
          ""
        ) : (
          <LayerArea>
            <Suspense fallback={<Spinner text="로딩중입니다." />}>
              <SpecificStory />
            </Suspense>
          </LayerArea>
        )}
      </>
    );
  } else {
    return <></>;
  }
}

export default React.memo(Layer);
