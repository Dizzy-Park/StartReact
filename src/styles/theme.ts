import { indigo } from "@material-ui/core/colors";
import { createTheme, Theme as MuiTheme } from "@material-ui/core/styles";

/**
 * 테마 설정을위한 생성
 */
const muiTheme: MuiTheme = createTheme({
  palette: {
    primary: indigo,
  },
});
/**
 * 테마 반환
 */
export const theme = {
  ...muiTheme,
  app: {
    backgroundColor: "#222232",
  },
};
/**
 * 테마 타입 설정
 */
export type Theme = typeof theme;
