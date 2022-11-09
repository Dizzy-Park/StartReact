import React from "react";

import useInput from "../store/hook/useInput";
import useUser from "../store/modules/user/userHook";
import { IUserFetc } from "../store/modules/user/userR";
import { useRef } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";

const ContainerMainView = styled.div`
  padding: "10px 10px";
`;

const BoxDiv = styled.div`
  margin-bottom: "10px";
`;

interface Props {}

const Index: React.FC<Props> = () => {
  // password input 참조
  const passwordRef = useRef<HTMLInputElement>(null);
  // button 참조
  const submit = useRef<HTMLButtonElement>(null);
  // email input 연결 Hook 설정
  const email = useInput<HTMLInputElement>({ target: passwordRef });
  // password input 연결 Hook 설정
  const password = useInput<HTMLButtonElement>({ target: submit });
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
          <input placeholder={"Email"} {...email} />
        </BoxDiv>
        <BoxDiv>
          <input
            placeholder={"Password"}
            type={"password"}
            ref={passwordRef}
            {...password}
          />
        </BoxDiv>
        <hr />
        <BoxDiv>
          <h6>Token + cookie 테스트</h6>
        </BoxDiv>
        <BoxDiv>
          <Button
            ref={submit}
            onClick={loginHandler}
            text="토큰 쿠키 저장"
          ></Button>
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
