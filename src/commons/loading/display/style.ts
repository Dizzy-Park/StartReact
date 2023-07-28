import styled, { css } from "styled-components";

export const SpinnerWrap = styled.div`
  text-align: center;
`;

export const SpinnerContent = styled.div<{
  size?: number;
  direction?: "width" | "height";
}>`
  display: inline-block;
  position: relative;
  ${props => {
    switch (props.direction) {
      case "width":
      case "height":
        return css`
          width: 100%;
          height: 100%;
        `;
      default:
        return css`
          width: ${props.size ? `${props.size}px` : "70px"};
          height: ${props.size ? `${props.size}px` : "70px"};
        `;
    }
  }};
  margin: 100px 0;

  & > div {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 10px solid var(--primary);
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--primary) transparent transparent transparent;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerText = styled.p`
  text-align: center;
`;
