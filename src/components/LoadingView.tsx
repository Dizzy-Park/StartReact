import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import useLoading from "../store/modules/loading/loadingHook";

const LoadingArea = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
`;

const LoadingIcon = styled.div`
  position: absolute;
  height: 100%;
  top: 20%;
  left: 45%;
`;

const LoadingView: React.FC = () => {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading === false ? (
        ""
      ) : (
        <>
          <LoadingArea>
            <LoadingIcon>
              <CircularProgress color="inherit" />
            </LoadingIcon>
          </LoadingArea>
        </>
      )}
    </>
  );
};

export default LoadingView;
