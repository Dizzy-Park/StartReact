import {
  CssBaseline,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { theme } from "../styles/theme";
import Http from "../store/net/Http";
// import { IRes } from '../store/net/Http';
import LoadingView from "../components/LoadingView";
import Index from "./index";
import User from "./user";
import { config } from "../config/config";
import { connect } from "../store/net/Soket";

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
      Http.defaults.headers[config.token.header] = sessionStorage.getItem(
        config.token.name
      );
      // 토큰이 있으면 소켓 재 연결
      connect();
    }
    // localStorage 에 값이 있는지 확인후 헤더 설정
    if (
      (localStorage.getItem(config.token.name) === "" ||
        localStorage.getItem(config.token.name) === null) === false
    ) {
      Http.defaults.headers[config.token.header] = localStorage.getItem(
        config.token.name
      );
    }
  }
  /**
   * styled-components 와 @material-ui/core 에 하나의 테마를 적용하기 위한 기본 코드
   * 모든 페이지는 이 파일을 통해서 구성된다
   */
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        {/* styled-components 에 테마를 적용하기 위한 코드 */}
        <StyledThemeProvider theme={theme}>
          {/* @material-ui/core 에 테마를 적용하기 위한 코드 */}
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <LoadingView />
            {/* 기본 레이아웃을 잡기위한 컴포넌트 */}
            <Layout>
              <Switch>
                <Route path="/" component={Index} />
                <Route path="/user" component={User} />
                <Redirect path="*" to="/" />
              </Switch>
            </Layout>
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default RootApp;
