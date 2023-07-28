import React from "react";
import styled, { type IStyledComponent } from "styled-components";
import Spinner from "./display/Spinner";
import { useLoadingValue } from "./store/loadingHook";

export const LoadingArea = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: ${props => props.theme.colors.bgDark};
  opacity: 0.8;
`;

const LoadingIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface ILoadingParams {
  /**
   * 영역 스타일 컴포넌트 전달
   * ```tsx
   * const loadingArea = styled(LoadingArea)`
   *   position: fixed;
   *   width: 500px;
   * `
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  area?: IStyledComponent<"web", any>;
}

function LoadingView(props: ILoadingParams) {
  const { isLoading, message } = useLoadingValue();
  const Area = props.area ? props.area : LoadingArea;

  return (
    <>
      {isLoading === false ? (
        ""
      ) : (
        <Area>
          <LoadingIcon>
            <Spinner text={message} />
            {/* <CircularProgress color="inherit" /> */}
          </LoadingIcon>
        </Area>
      )}
    </>
  );
}

export default LoadingView;
