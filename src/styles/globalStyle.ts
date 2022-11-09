import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
:root {
  --bodyBackground: ${props => props.theme.colors.bodyBackground};
  --primary: ${props => props.theme.colors.primary};
  --fontPrimary: ${props => props.theme.colors.fontPrimary};
  --fontDarkGrey: ${props => props.theme.colors.fontDarkGrey};
  --fontRed: ${props => props.theme.colors.fontRed};
  --fontBlue: ${props => props.theme.colors.fontBlue};
  --fontGrey: ${props => props.theme.colors.fontGrey};
  --fontSemiGrey: ${props => props.theme.colors.fontSemiGrey};
  --fontBrown: ${props => props.theme.colors.fontBrown};

  --bgGrey: ${props => props.theme.colors.bgGrey};
  --badgeBg: ${props => props.theme.colors.badgeBg};

  --borderDarkGrey: ${props => props.theme.colors.borderDarkGrey};

  --dark: ${props => props.theme.colors.dark};
  --darkGrey: ${props => props.theme.colors.darkGrey};
  --grey: ${props => props.theme.colors.grey};
  --lightGrey: ${props => props.theme.colors.lightGrey};
  --red: ${props => props.theme.colors.red};
  --yellow: ${props => props.theme.colors.yellow};
  --orange: ${props => props.theme.colors.orange};
  --blue: ${props => props.theme.colors.blue};
  --lightBlue: ${props => props.theme.colors.lightBlue};
  --green: ${props => props.theme.colors.green};
  --labelGreen: ${props => props.theme.colors.labelGreen};
  --labelBlue: ${props => props.theme.colors.labelBlue};
  --labelLightRed: ${props => props.theme.colors.labelLightRed};
  --labelRed: ${props => props.theme.colors.labelRed};
  --borderInput: ${props => props.theme.colors.borderInput};
  --borderGrey: ${props => props.theme.colors.borderGrey};
  --disabled: ${props => props.theme.colors.disabled};
  --placeholder: ${props => props.theme.colors.placeholder};
  --btnGrey: ${props => props.theme.colors.btnGrey};
  --bgLightGrey: ${props => props.theme.colors.bgLightGrey};

  --fontText: ${props => props.theme.fontFamily.normal};
  --fontNumber: ${props => props.theme.fontFamily.number};
}

html {
  height: 100%;
  font-size: ${props => props.theme.fontSize.convert};
}
body {
  overflow-y: auto;
  position: relative;
  min-height: 100%;
  background-color: ${props => props.theme.colors.bodyBackground};
  font-family: ${props => props.theme.fontFamily.normal};
  font-size: ${props => props.theme.fontSize.default};
  font-weight: ${props => props.theme.fontWeight.regular};
  line-height: 1.5;

  &.device-pc {
    width: 500px;
    margin: 0 auto;
  }
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
}
`;
