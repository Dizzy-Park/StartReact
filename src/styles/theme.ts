/**
 * 테마 설정을위한 생성
 */
const fonts = {
  family: {
    normal: `'NotoSansKR', Arial, sans-serif`,
    number: `'DMSans', Arial, sans-serif`,
  },
  size: {
    convert: "14px", //기준 픽셀값을 바꾸면 전체 폰트 사이즈가 변경됨
    default: "1rem",
    text: {
      xxs: "0.714rem", // 10px
      xs: "0.786rem", // 11px
      xsm: "0.857rem", // 12px
      sm: "0.929rem", // 13px
      md: "1.071rem", // 15px
      lg: "1.143rem", // 16px
      xl: "1.22rem", //17px
      xxl: "2.286rem", //32px
    },
    title: {
      sm: "1.286rem", //18
      md: "1.429rem", //20
      lg: "1.571rem", //22
      xl: "1.712rem", //24
      xxl: "1.857rem", //26
    },
  },
  weight: {
    thin: "200",
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
    exBold: "900",
  },
};

const colors = {
  // v2 정리 된 부분
  bodyBackground: "#fff",
  primary: "#fe3d04",
  fontPrimary: "#222222",
  fontDarkGrey: "#4c4c4c",
  fontRed: "#eb4e28",
  fontBlue: "#2685f5",
  fontGrey: "#a5a5a5",
  fontSemiGrey: "#798593",
  fontBrown: "#906f4c",

  bgGrey: "#f2f4f8",

  badgeBg: "#f2f4f8",

  borderDarkGrey: "#c8c8c8",
  borderGrey: "#e0e0e0",

  borderInput: "#c7c7c7",
  placeholder: "#798593",

  // v2 정리 안된 부분
  dark: "#323232",
  darkGrey: "#4c4c4c",
  red: "#eb4e28",
  grey: "#898989",
  lightGrey: "#8e8e8e",
  yellow: "#f3b108",
  orange: "#fa9704",
  blue: "#0d7cff",
  lightBlue: "#ebf0ff",
  green: "#2cb864",
  labelGreen: "#51b5a4",
  labelBlue: "#4c7cfa",
  labelLightRed: "#ffdddd",
  labelRed: "#ff6868",

  btnGrey: "#bababa",
  bgLightGrey: "#fafafa",

  disabled: "#c4c4c4",

  // 여기서부터 어드민에서 쓰는 컬러
  success: "#2ac769",
  successLight: "#eaf7ef",
  positive: "#3e66fb",
  positiveLight: "#e2e8fe",
  negative: "#ff6263",
  negativeLight: "#ffe0e0",
  wait: "#f6a609",
  waitLight: "#fff0d9",
  dealsHightLight: "#ff0000",
  fontContrast: "#f6a609",
  fontDisabled: "#a8a9aa",

  borderPrimary: "#f4f4f4",
  borderFocus: "#3e3f40",
  borderDark: "#4c4c4c",
  borderDisabled: "#f4f4f4",

  bgTableHead: "#ffffff",
  bgForm: "#f7f7f7",

  btnPrimary: "#f5c74c",
  btnDark: "#515355",
  btnNegative: "#ff6263",
  btnWarning: "#f6a609",
  btnPositive: "#3e66fb",
  btnWhite: "#f4f4f4",
};

const lightColors = {
  ...colors,
};

const darkColors = {
  ...colors,
  bodyBackground: "#323232",
  fontPrimary: "#fff",
};

/**
 * 테마 반환
 */
const defaultTheme = {
  fontFamily: fonts.family,
  fontSize: fonts.size,
  fontWeight: fonts.weight,
};

export const lightTheme = {
  ...defaultTheme,
  colors: lightColors,
};

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: darkColors,
};

/**
 * 테마 타입 설정
 */
export type Theme = typeof lightTheme;
// export const styled = baseStyled as ThemedStyledInterface<Theme>;
