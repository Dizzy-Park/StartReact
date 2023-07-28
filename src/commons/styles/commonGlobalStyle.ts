import { css } from "styled-components";
import { ResetStyle } from "./resetStyle";

export const CommonGlobal = css`
  ${ResetStyle};
  :root {
    --background-body: ${props => props.theme.colors.bodyBackground};
    --success: ${props => props.theme.colors.success};
    --success-light: ${props => props.theme.colors.successLight};
    --positive: ${props => props.theme.colors.positive};
    --positive-light: ${props => props.theme.colors.positiveLight};
    --negative: ${props => props.theme.colors.negative};
    --negative-light: ${props => props.theme.colors.negativeLight};
    --wait: ${props => props.theme.colors.wait};
    --wait-light: ${props => props.theme.colors.waitLight};

    --font-primary: ${props => props.theme.colors.fontPrimary};
    --font-grey: ${props => props.theme.colors.fontGrey};
    --font-sub-grey: ${props => props.theme.colors.fontSubGrey};
    --font-red: ${props => props.theme.colors.fontRed};
    --font-blue: ${props => props.theme.colors.fontBlue};
    --font-contrast: ${props => props.theme.colors.fontContrast};
    --font-disabled: ${props => props.theme.colors.fontDisabled};
    --font-deals-hightLight: ${props => props.theme.colors.dealsHightLight};

    --border-primary: ${props => props.theme.colors.borderPrimary};
    --border-focus: ${props => props.theme.colors.borderFocus};
    --border-dark: ${props => props.theme.colors.borderDark};
    --border-grey: ${props => props.theme.colors.borderGrey};
    --border-disabled: ${props => props.theme.colors.borderDisabled};

    --bg-form: ${props => props.theme.colors.bgForm};
    --bg-table-head: ${props => props.theme.colors.bgTableHead};
    --bg-table-sub: ${props => props.theme.colors.bgSubForm};
    --bg-dark: ${props => props.theme.colors.bgDark};
    --bg-grey: ${props => props.theme.colors.bgGrey};
    --bg-red: ${props => props.theme.colors.bgRed};
    --bg-blue: ${props => props.theme.colors.bgBlue};

    --btn-dark: ${props => props.theme.colors.btnDark};
    --btn-negative: ${props => props.theme.colors.btnNegative};
    --btn-warning: ${props => props.theme.colors.btnWarning};
    --btn-positive: ${props => props.theme.colors.btnPositive};
    --btn-disabled: ${props => props.theme.colors.btnDisabled};

    --disabled: ${props => props.theme.colors.disabled};
    --placeholder: ${props => props.theme.colors.placeholder};

    --border-hover: ${props => props.theme.colors.borderHover};
    --btn-dark-hover: ${props => props.theme.colors.btnDarkHover};
    --btn-positive-hover: ${props => props.theme.colors.btnPositiveHover};
    --btn-negative-hover: ${props => props.theme.colors.btnNegativeHover};
    --btn-warning-hover: ${props => props.theme.colors.btnWarningHover};
    --btn-white-hover: ${props => props.theme.colors.btnWhiteHover};
    --btn-blue-hover: ${props => props.theme.colors.btnBlueHover};
    --btn-gray-hover: ${props => props.theme.colors.btnGrayHover};
    --btn-light-gray-hover: ${props => props.theme.colors.btnLightGrayHover};
    --btn-green-hover: ${props => props.theme.colors.btnGreenHover};
    --btn-cyan-hover: ${props => props.theme.colors.btnCyanHover};

    --btn-dark-disabled: ${props => props.theme.colors.btnDarkDisabled};
    --btn-positive-disabled: ${props => props.theme.colors.btnPositiveDisabled};
    --btn-negative-disabled: ${props => props.theme.colors.btnNegativeDisabled};
    --btn-warning-disabled: ${props => props.theme.colors.btnWarningDisabled};
    --btn-white-disabled: ${props => props.theme.colors.btnWhiteDisabled};
  }

  html {
    font-size: ${props => props.theme.fontSize.convert};
  }

  body {
    position: relative;
    background-color: ${props => props.theme.colors.bodyBackground};
    font-family: ${props => props.theme.fontFamily.text};
    font-size: ${props => props.theme.fontSize.default};
    font-weight: ${props => props.theme.fontWeight.regular};
    line-height: 1.5em;
  }
`;
