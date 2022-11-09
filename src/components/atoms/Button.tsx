import { useButton } from "commons/ui/useUihook";
import { IValid } from "commons/ui/useValid";
import { Debounce } from "commons/utils/Debounce";
import {
  ButtonColorType,
  ButtonSizeType,
  ButtonType,
} from "components/ComponentsType";
import { IButtonProps } from "components/componentsVo";
import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

const CommonBtnStyle = css<IButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:disabled,
  &.is-disabled {
    cursor: not-allowed;
  }

  ${props => {
    switch (props.device) {
      case true:
        return css`
          padding: 0 20px;
          line-height: 54px;
          font-size: ${props => props.theme.fontSize.text.lg};
        `;
      case false:
        return css`
          line-height: 1em;
          font-size: ${props => props.theme.fontSize.default};
        `;
    }
  }}

  ${props => {
    if (props.isRadius)
      return css`
        border-radius: 30px;
      `;
  }}

  ${props => {
    if (props.isBlock)
      return css`
        display: block;
        width: 100%;
      `;
  }}

${props => {
    if (props.disabled) {
      switch (props.btnType) {
        case ButtonType.NORMAL:
          return css`
            border-color: var(--disabled) !important;
            background-color: var(--disabled) !important;
            color: #fff;
          `;
        case ButtonType.BORDER:
          return css`
            border-color: var(--disabled) !important;
            color: var(--disabled) !important;
          `;
      }
    }
  }}
`;

const SocialLoginStyle = css`
  position: relative;
  border: none;
  border-radius: 2px;
  font-size: ${props => props.theme.fontSize.text.md};

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 8px;
    width: 28px;
    height: 28px;
    background-size: 100%;
    transform: translateY(-50%);
  }
`;

const ButtonColor = css<{ btnType?: ButtonType; btnColor?: ButtonColorType }>`
  ${props => {
    if (props.btnType === ButtonType.NORMAL) {
      switch (props.btnColor) {
        case ButtonColorType.PRIMARY:
          return css`
            border-color: var(--primary);
            background-color: var(--primary);
            color: #fff;
          `;
        case ButtonColorType.DARK:
          return css`
            border-color: var(--dark);
            background-color: var(--dark);
            color: #fff;
          `;
        case ButtonColorType.DARK_GREY:
          return css`
            border-color: var(--darkGrey);
            background-color: var(--darkGrey);
            color: #fff;
          `;
        case ButtonColorType.LIGHT_GREY:
          return css`
            border-color: var(--borderGrey);
            background-color: var(--borderGrey);
            color: #fff;
          `;
        case ButtonColorType.GREEN:
          return css`
            border-color: var(--green);
            background-color: var(--green);
            color: #fff;
          `;
        case ButtonColorType.RED:
          return css`
            border-color: var(--red);
            background-color: var(--red);
            color: #fff;
          `;
        case ButtonColorType.BLACK:
          return css`
            border-color: var(--fontPrimary);
            background-color: var(--fontPrimary);
            color: #fff;
          `;
        case ButtonColorType.DISABLED:
          return css`
            border-color: var(--disabled);
            background-color: var(--disabled);
            color: #fff;
          `;
        case ButtonColorType.KAKAO:
          return css`
            ${SocialLoginStyle};
            background-color: #fee500;
            color: #3c1e1e;

            &::before {
              background-image: url(./images/icon/cost-kakao.svg);
            }
          `;
        case ButtonColorType.NAVER:
          return css`
            ${SocialLoginStyle};
            background-color: #1dc800;
            color: #fff;

            &::before {
              background-image: url(./images/icon/login-naver.svg);
            }
          `;
        default:
          return css`
            border-color: var(--primary);
            background-color: var(--primary);
            color: #fff;
          `;
      }
    } else {
      switch (props.btnColor) {
        case ButtonColorType.PRIMARY:
          return css`
            border-color: var(--primary);
            color: var(--primary);
          `;
        case ButtonColorType.DARK:
          return css`
            border-color: var(--dark);
            color: var(--dark);
          `;
        case ButtonColorType.DARK_GREY:
          return css`
            border-color: var(--darkGrey);
            color: var(--fontDarkGrey);
          `;
        case ButtonColorType.LIGHT_GREY:
          return css`
            border-color: var(--borderGrey);
            color: var(--fontDarkGrey);
          `;
        case ButtonColorType.GREEN:
          return css`
            border-color: var(--green);
            color: var(--green);
          `;
        case ButtonColorType.RED:
          return css`
            border-color: var(--red);
            color: var(--red);
          `;
        case ButtonColorType.BLACK:
          return css`
            border-color: var(--fontPrimary);
            color: var(--fontPrimary);
          `;
        case ButtonColorType.DISABLED:
          return css`
            border-color: var(--disabled);
            color: var(--disabled);
          `;
        default:
          return css`
            border-color: var(--primary);
            color: var(--primary);
          `;
      }
    }
  }}
`;

const ButtonSize = css<{ device?: boolean; btnSize?: ButtonSizeType }>`
  ${props => {
    if (props.device) {
      switch (props.btnSize) {
        case ButtonSizeType.LG:
          return css`
            padding: 0 10px;
            line-height: 54px;
            font-size: ${props => props.theme.fontSize.text.lg};
          `;
        case ButtonSizeType.LMD:
          return css`
            padding: 0 10px;
            line-height: 48px;
            font-size: ${props => props.theme.fontSize.text.md};
          `;
        case ButtonSizeType.MD:
          return css`
            padding: 0 10px;
            line-height: 34px;
            font-size: ${props => props.theme.fontSize.default};
          `;
        case ButtonSizeType.SM:
          return css`
            padding: 0 10px;
            line-height: 30px;
            font-size: ${props => props.theme.fontSize.default};
          `;
        case ButtonSizeType.XSM:
          return css`
            padding: 0 5px;
            line-height: 27px;
            font-size: ${props => props.theme.fontSize.text.sm};
          `;
        case ButtonSizeType.XS:
          return css`
            padding: 0 5px;
            line-height: 24px;
            font-size: ${props => props.theme.fontSize.text.xsm};
          `;
      }
    } else {
      switch (props.btnSize) {
        case ButtonSizeType.LG:
          return css`
            line-height: 54px;
            font-size: ${props => props.theme.fontSize.text.lg};
          `;
        case ButtonSizeType.LMD:
          return css`
            padding: 0 10px;
            line-height: 48px;
            font-size: ${props => props.theme.fontSize.text.md};
          `;
        case ButtonSizeType.MD:
          return css`
            padding: 0 10px;
            line-height: 38px;
            font-size: ${props => props.theme.fontSize.default};
          `;
        case ButtonSizeType.SM:
          return css`
            padding: 0 8px;
            line-height: 32px;
            font-size: ${props => props.theme.fontSize.default};
          `;
        case ButtonSizeType.XSM:
          return css`
            padding: 0 5px;
            line-height: 27px;
            font-size: ${props => props.theme.fontSize.text.sm};
          `;
        case ButtonSizeType.XS:
          return css`
            padding: 0 5px;
            line-height: 20px;
            font-size: ${props => props.theme.fontSize.text.xsm};
          `;
      }
    }
  }}
`;

const ButtonStyle = styled.button<IButtonProps>`
  ${CommonBtnStyle};
  ${ButtonColor};
  ${ButtonSize};
  ${props =>
    props.width !== undefined &&
    css`
      width: ${props.width}px;
    `};
`;

/**
 * Button 컴포넌트
 * @param text 버튼 문구
 * @param btnType {@link ButtonType} 버튼 타입: 색있는 버튼 or 보더만 있는 버튼 (default: NORMAL)
 * @param btnColor {@link ButtonColorType} 버튼색상 (default: PRIMARY)
 * @param btnSize {@link ButtonSizeType} 버튼 사이즈 (default: MD)
 * @param isRadius 버튼모양을 둥글게 둥글게 (defualt: false)
 * @param isBlock 가로로 한 줄을 모두 차지하는 버튼
 * @param className 클래스 네임
 * @param width 가로 사이즈
 */
function Button(props: IButtonProps): JSX.Element {
  const click = () => {
    if (props.onClick) {
      if (props.debounce) {
        Debounce(props.onClick);
      } else {
        props.onClick();
      }
    }
  };

  return (
    <ButtonStyle
      type="button"
      btnType={props.btnType !== undefined ? props.btnType : ButtonType.NORMAL}
      btnColor={
        props.btnColor !== undefined ? props.btnColor : ButtonColorType.PRIMARY
      }
      btnSize={props.btnSize !== undefined ? props.btnSize : ButtonSizeType.MD}
      isRadius={props.isRadius !== undefined ? props.isRadius : false}
      isBlock={props.isBlock !== undefined ? props.isBlock : false}
      disabled={props.disabled !== undefined ? props.disabled : false}
      className={props.className && props.className}
      width={props.width}
      onClick={click}
    >
      {props.text ? props.text : props.children ? props.children : ""}
    </ButtonStyle>
  );
}

export default forwardRef(Button);

interface IUiButtonProps extends IButtonProps {
  id: string;
  init?: boolean;
  valid?: IValid<boolean>;
}

export function UiButton(props: IUiButtonProps): JSX.Element {
  const { buttonValue, changeValue } = useButton(
    props.id,
    props.valid,
    props.init
  );
  const click = () => {
    changeValue(true);
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <Button
      btnType={props.btnType !== undefined ? props.btnType : ButtonType.NORMAL}
      btnColor={
        props.btnColor !== undefined ? props.btnColor : ButtonColorType.PRIMARY
      }
      btnSize={props.btnSize !== undefined ? props.btnSize : ButtonSizeType.MD}
      isRadius={props.isRadius !== undefined ? props.isRadius : false}
      isBlock={props.isBlock !== undefined ? props.isBlock : false}
      disabled={buttonValue}
      className={props.className && props.className}
      width={props.width}
      onClick={click}
      text={props.text}
    />
  );
}

// /**
//  * 소셜로그인 버튼
//  */
// interface ISocialButtonProps extends IButtonProps {
//   socialType: EasyLoginType;
// }
// export function SocialLoginButton(props: ISocialButtonProps) {
//   let buttonColor;
//   switch (props.socialType) {
//     case EasyLoginType.KAKAO:
//       buttonColor = ButtonColorType.KAKAO;
//       break;
//     case EasyLoginType.NAVER:
//       buttonColor = ButtonColorType.NAVER;
//       break;
//     case EasyLoginType.FACEBOOK:
//       buttonColor = ButtonColorType.FACEBOOK;
//       break;
//     case EasyLoginType.GOOGLE:
//       buttonColor = ButtonColorType.GOOGLE;
//       break;
//   }
//   const click = () => {
//     if (props.onClick) {
//       if (props.debounce) {
//         Debounce(props.onClick);
//       } else {
//         props.onClick();
//       }
//     }
//   };
//   return (
//     <Button
//       btnType={props.btnType !== undefined ? props.btnType : ButtonType.NORMAL}
//       btnColor={buttonColor}
//       btnSize={props.btnSize !== undefined ? props.btnSize : ButtonSizeType.LMD}
//       isRadius={props.isRadius !== undefined ? props.isRadius : false}
//       isBlock={props.isBlock !== undefined ? props.isBlock : false}
//       disabled={props.disabled}
//       className={props.className && props.className}
//       width={props.width}
//       onClick={click}
//       text={props.text}
//     />
//   );
// }
