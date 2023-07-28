/**
 * admin 공용 테마 set
 * @see commonFonts 폰트 관련 설정(글꼴, 사이즈, 두께)
 * @see commonColors 기본 컬러값
 * @see hoverColors hover시 컬러값
 * @see disabledColors disable 컬러값
 */
export const commonFonts = {
  family: {
    text: `'NotoSans', Helvetica, Arial, sans-serif`,
    number: `'DMSans', Helvetica, Arial, sans-serif`,
  },
  size: {
    convert: "14px", //기준 픽셀값을 바꾸면 전체 폰트 사이즈가 변경됨
    default: "1rem",
    text: {
      sm: "0.857rem", //14px 기준 12px
      md: "1.071rem", // 15px
      lg: "1.143rem", // 16px
    },
    title: {
      xsm: "1.143rem", //16
      sm: "1.286rem", //18
      md: "1.429rem", //20
      lg: "1.571rem", //22
      xl: "1.857rem", //26
    },
  },
  weight: {
    thin: "200",
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
  },
};

//TODO: 컬러값 정리 필요
export const commonColors = {
  // 전체 백그라운드
  bodyBackground: "#ffffff",
  // 기능 컬러
  success: "#2ac769",
  successLight: "#eaf7ef",
  positive: "#3CADFF",
  positiveLight: "#e2e8fe",
  negative: "#FF4343",
  negativeLight: "#ffe0e0",
  wait: "#f6a609",
  waitLight: "#fff0d9",
  //폰트 컬러
  fontPrimary: "#25282b",
  fontGrey: "#515355",
  fontSubGrey: "#898989",
  fontDisabled: "#a8a9aa",
  fontContrast: "#f6a609",
  fontRed: "#eb4e28",
  fontBlue: "#0d7cff",
  dealsHightLight: "#ff0000",
  // 보더 컬러
  borderPrimary: "#d3d4d5",
  borderFocus: "#3e3f40",
  borderDark: "#a8a9aa",
  borderGrey: "#e0e0e0",
  borderDisabled: "#f4f4f4",
  // 백그라운드 컬러
  bgForm: "#f7f7f7",
  bgTableHead: "#f7f7f7",
  bgSubForm: "#fafafa",
  bgDark: "#4c4c4c",
  bgGrey: "#e0e0e0",
  bgRed: "#eb4e28",
  bgBlue: "#0d7cff",
  // 버튼 컬러
  btnDark: "#515355",
  btnNegative: "#ff6263",
  btnWarning: "#f6a609",
  btnPositive: "#3e66fb",
  btnWhite: "#f4f4f4",
  btnDisabled: "#DDDDDD",
  btnBlue: "#264B82",
  btnGray: "#939393",
  btnLightGray: "#D6D6D6",
  btnGreen: "#268271",
  btnCyan: "#207599",
  //기타상태정의
  disabled: "#c4c4c4",
  placeholder: "#e5e5e5",
};

export const commonHoverColors = {
  borderHover: `${commonColors.borderPrimary}85`,
  btnDarkHover: `${commonColors.btnDark}99`,
  btnPositiveHover: `${commonColors.btnPositive}99`,
  btnNegativeHover: `${commonColors.btnNegative}99`,
  btnWarningHover: `${commonColors.btnWarning}99`,
  btnWhiteHover: `${commonColors.btnWhite}99`,
  btnBlueHover: `${commonColors.btnBlue}99`,
  btnGrayHover: `${commonColors.btnGray}99`,
  btnLightGrayHover: `${commonColors.btnLightGray}99`,
  btnGreenHover: `${commonColors.btnGreen}99`,
  btnCyanHover: `${commonColors.btnCyan}99`,
};

export const commonDisabledColors = {
  btnDarkDisabled: `${commonColors.btnDark}40`,
  btnPositiveDisabled: `${commonColors.btnPositive}40`,
  btnNegativeDisabled: `${commonColors.btnNegative}40`,
  btnWarningDisabled: `${commonColors.btnWarning}40`,
  btnWhiteDisabled: `${commonColors.btnWhite}40`,
};
