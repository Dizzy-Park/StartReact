import React, { RefObject } from "react";
import {
  Box,
  Input,
  Button,
  styled,
  Container,
  Typography,
} from "@material-ui/core";

import useInput, { IUseInput } from "../store/hook/useInput";
import useUser from "../store/modules/user/userHook";
import { IUserFetc } from "../store/modules/user/userR";
import { useRef } from "react";

const ContainerMainView = styled(Container)({
  padding: "10px 10px",
});

const BoxDiv = styled(Box)({
  marginBottom: "10px",
});

const TokenArea = styled(BoxDiv)({});

interface Props {}

const Index: React.FC<Props> = () => {
  // password input 참조
  const passwordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  // button 참조
  const submit: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  // email input 연결 Hook 설정
  const email: IUseInput = useInput<HTMLInputElement>("", passwordRef);
  // password input 연결 Hook 설정
  const password: IUseInput = useInput<HTMLButtonElement>("", submit);
  // userHook.ts 에서 가지고온 hook
  const { login, errorMessage } = useUser();
  const loginHandler = async () => {
    if (email.value !== "" && password.value !== "") {
      login({ email: email.value, pwd: password.value } as IUserFetc);
    } else {
      alert("입력해라");
    }
  };
  return (
    <>
      <ContainerMainView>
        <BoxDiv>메인페이지 입니다</BoxDiv>
        <BoxDiv>
          <Input placeholder={"Email"} {...email} />
        </BoxDiv>
        <BoxDiv>
          <Input
            placeholder={"Password"}
            type={"password"}
            inputRef={passwordRef}
            {...password}
          />
        </BoxDiv>
        <hr />
        <TokenArea>
          <BoxDiv>
            <Typography variant={"h6"}>Token + cookie 테스트</Typography>
          </BoxDiv>
        </TokenArea>
        <BoxDiv>
          <Button variant="outlined" ref={submit} onClick={loginHandler}>
            토큰 쿠키 저장
          </Button>
        </BoxDiv>
        {errorMessage ? (
          <BoxDiv>store에 저장된 error =&gt; {errorMessage}</BoxDiv>
        ) : (
          ""
        )}
        <BoxDiv></BoxDiv>
      </ContainerMainView>
    </>
  );
};
export default Index;
