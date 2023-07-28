import { ThemeProvider } from "styled-components";
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Http from "../store/net/Http";
// import { IRes } from '../store/net/Http';
import Index from "./index";
import { config } from "../config/config";
import { GlobalStyle } from "styles/globalStyle";
import { lightTheme } from "styles/theme";
import Popup from "commons/popup/PopupController";
import LoadingView from "commons/loading/LoadingView";
import LayerController from "commons/layers/LayerController";

const User = lazy(() => import("./user"));

// import { ADD_ERROR, LOADING_ON } from '../store/modules/loadingR';
// import { logout } from '../store/modules/user/userR';

/**
 * CSR (client side rendering) 으로 화면을 구성하고 단일앱 구조를 가지기위한 방식이다
 * @param param0 AppProps next.js 에서 받아온 페이지 설정하기 위한 값
 * @returns
 */
const RootApp: React.FC = () => {
  // next.js (SSR) 는 window 가 없기 때문에 react.js (CSR) 에서만 실행되기 위한 처리
  if (typeof window !== "undefined") {
    // sessionStorage 에 값이 있는지 확인후 헤더 설정
    if (
      (sessionStorage.getItem(config.token.name) === "" ||
        sessionStorage.getItem(config.token.name) === null) === false
    ) {
      Http.defaults.headers.common[config.token.header] =
        sessionStorage.getItem(config.token.name) as string;
    }
    // localStorage 에 값이 있는지 확인후 헤더 설정
    if (
      (localStorage.getItem(config.token.name) === "" ||
        localStorage.getItem(config.token.name) === null) === false
    ) {
      Http.defaults.headers.common[config.token.header] = localStorage.getItem(
        config.token.name
      ) as string;
    }
  }
  const [theme] = useState(lightTheme);
  /**
   * styled-components 와 @material-ui/core 에 하나의 테마를 적용하기 위한 기본 코드
   * 모든 페이지는 이 파일을 통해서 구성된다
   */
  return (
    <ThemeProvider theme={{ ...theme }}>
      <GlobalStyle />
      <BrowserRouter>
        <Popup />
        {/* styled-components 에 테마를 적용하기 위한 코드 */}
        <LoadingView />
        <LayerController />
        {/* 기본 레이아웃을 잡기위한 컴포넌트 */}
        <Suspense fallback={"로딩중입니다"}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/user"
              element={
                <Suspense fallback={"로딩중입니다"}>
                  <User />
                </Suspense>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default RootApp;
