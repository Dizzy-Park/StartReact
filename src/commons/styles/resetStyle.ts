import { css } from "styled-components";

export const ResetStyle = css`
  @font-face {
    font-family: "NotoSans";
    src: url("/fonts/NotoSansKR-Regular.otf") format("opentype"),
      url("/fonts/NotoSansKR-Regular.woff2") format("woff2"),
      url("/fonts/NotoSansKR-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "NotoSans";
    src: url("/fonts/NotoSansKR-Medium.otf") format("opentype"),
      url("/fonts/NotoSansKR-Medium.woff2") format("woff2"),
      url("/fonts/NotoSansKR-Medium.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "NotoSans";
    src: url("/fonts/NotoSansKR-Bold.otf") format("opentype"),
      url("/fonts/NotoSansKR-Bold.woff2") format("woff2"),
      url("/fonts/NotoSansKR-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "DMSans";
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/DMSans-Regular.woff2") format("woff2"),
      url("/fonts/DMSans-Regular.woff") format("woff"),
      url("/fonts/DMSans-Regular.ttf") format("truetype");
  }

  @font-face {
    font-family: "DMSans";
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url("../fonts/DMSans-Medium.woff2") format("woff2"),
      url("../fonts/DMSans-Medium.woff") format("woff"),
      url("../fonts/DMSans-Medium.ttf") format("truetype");
  }

  @font-face {
    font-family: "DMSans";
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/DMSans-Bold.otf") format("woff2"),
      url("/fonts/DMSans-Bold.woff") format("woff"),
      url("/fonts/DMSans-Bold.otf") format("opentype");
  }

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  :focus {
    outline: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type="search"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  textarea {
    overflow: auto;
    vertical-align: top;
    resize: vertical;
  }

  audio,
  canvas,
  video {
    display: inline-block;
    max-width: 100%;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  [hidden] {
    display: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:focus {
    outline: 0;
  }

  a:active,
  a:hover {
    outline: 0;
  }

  img {
    border: 0;
    vertical-align: middle;
    -ms-interpolation-mode: bicubic;
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    display: none;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
    padding: 0;
    font-size: inherit;
    color: inherit;
    line-height: 1;
    vertical-align: middle;
  }

  button,
  input {
    line-height: normal;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    cursor: pointer;
  }

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="checkbox"],
  input[type="radio"] {
    width: 13px;
    height: 13px;
    padding: 0;
    box-sizing: border-box;
  }

  input::-ms-clear {
    display: none;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  textarea {
    overflow: auto;
    vertical-align: top;
    resize: vertical;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select::-ms-expand {
    display: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  caption {
    display: none;
  }

  ::-moz-selection {
    background: #fcccca;
    text-shadow: none;
  }

  ::selection {
    background: #fcccca;
    text-shadow: none;
  }

  pre {
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
  }
`;
