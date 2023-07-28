import React from "react";
import { SpinnerContent, SpinnerText, SpinnerWrap } from "./style";

/**
 * 로딩 컴포넌트 props
 * @property {string | React.ReactElement | undefined} text 로딩바 하단에 표시될 텍스트
 * @property {number | undefined} size 로딩바 크기
 */
interface ISpinnerProps {
  text?: string | React.ReactElement;
  size?: number;
  className?: string;
  direction?: "width" | "height";
}

/**
 * 로딩 애니메이션 컴포넌트
 * ```tsx
 * <Spinner {...props} />
 * ```
 * @param props {@link ISpinnerProps}
 * @returns JSX.Element
 */
function Spinner(props: ISpinnerProps): JSX.Element {
  return (
    <SpinnerWrap className={props.className}>
      <SpinnerContent direction={props.direction} size={props.size}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerContent>
      {props.text && <SpinnerText>{props.text}</SpinnerText>}
    </SpinnerWrap>
  );
}

export default Spinner;
