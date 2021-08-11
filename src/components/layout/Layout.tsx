import React, { ReactNode, useEffect } from "react";
import axios from "axios";
import TopBar from "./TopBar";

type Props = {
  children?: ReactNode;
};

const Layout: React.FC = ({ children }: Props) => {
  // 로딩바 설정
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        // on()
        return config;
      },
      function (error) {
        // off()
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (config) {
        // on()
        return config;
      },
      function (error) {
        // off()
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <div>
      <div>
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
