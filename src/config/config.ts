export interface IURL {
  BACKEND_URL: string | undefined;
  MESSAGE_URL: string | undefined;
}

export interface IConfig {
  Env: string | undefined;
  Url: IURL;
  token: {
    name: string;
    header: string;
  };
}

export const config: IConfig = {
  Env: process.env.NODE_ENV,
  token: {
    name: "token",
    header: "x-access-token",
  },
  Url: {
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    MESSAGE_URL: process.env.REACT_APP_MESSAGE_URL,
  },
};
