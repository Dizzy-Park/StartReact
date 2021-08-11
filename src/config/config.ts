import configFile from "./config.json";

const serverEnv = process.env.NODE_ENV;
const con = configFile[serverEnv];

export interface IURL {
  BACKEND_URL: string;
  IMAGE_URL: string;
  REDIRECT_URL: string;
}

export interface IConfig {
  Url: IURL;
}

export const config: IConfig = {
  Url: {
    BACKEND_URL: con["BACKEND_URL"],
    IMAGE_URL: con["IMAGE_URL"],
    REDIRECT_URL: con["REDIRECT_URL"],
  },
};
